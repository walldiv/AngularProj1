import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth-request.service';
import {Subscription} from 'rxjs';
import {User} from '../auth/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  loggedUser: User;

  constructor(private dataService: DataStorageService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authSvc.loggedUser.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataService.storeRecipes();
  }

  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authSvc.logOut();
  }
}
