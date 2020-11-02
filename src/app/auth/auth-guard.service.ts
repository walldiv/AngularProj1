import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth-request.service';
import {Observable} from 'rxjs';
import {map, tap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{

  constructor(private authSvc: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.loggedUser.pipe(
      take(1),
      map(user => {
        return !!user;   //!! will convert truthy/falsy on object being null or not.
      }),
      tap(isAuth => {
        if(!isAuth) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }

}
