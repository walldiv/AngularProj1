import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  constructor(private authSvc: AuthService){}

  ngOnInit() {
      this.authSvc.autoLogin();
  }
}
