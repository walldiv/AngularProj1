import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth-request.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', '../shared/loader.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('f') authForm: NgForm;
  isLoggedIn = false;
  isWaitingServer = false;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm){
    if(!form.valid) {return;}
    const value= form.value;
    console.log("SUBMITED FORM: " + value);
    if(this.isLoggedIn){
      return;
    } else {
      this.isWaitingServer = true;
      this.authSvc.registerUser(value.email, value.password)
        .subscribe(
          response => {console.log(response); this.isWaitingServer = false;},
          error => {
            console.log(error);
            this.isWaitingServer = false;
            let errorMsg = '';
            switch(error.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMsg = 'This email already exists';
                break;
              case 'OPERATION_NOT_ALLOWED':
                errorMsg = 'This operations is not allowed';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMsg = 'You have tried too many times ...';
                break;
            };
            alert(errorMsg);
          }
        );
      form.reset();
    }
  }

  onLogIn(form: NgForm) {
    if(!form.valid) {return;}
    const value= form.value;
    console.log("LOGIN FORM: " + value);
    if(this.isLoggedIn){
      return;
    } else {
      this.authSvc.login(value.email, value.password).subscribe(
        response => {
          console.log(response);
          this.isLoggedIn = true;
          this.router.navigate(['/recipe']);
        },
        error => {
          console.log(error);
          switch(error.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              alert('Email was not found');
              break;
            case 'INVALID_PASSWORD':
              alert('Invalid password');
              break;
            case 'USER_DISABLED':
              alert('Your account has been disabled');
              break;
          }
        }
      )
      form.reset();
    }
  }

}
