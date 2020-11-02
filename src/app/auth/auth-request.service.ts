import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDogcg9Ou6cAAsdyONNQOu6LVXMHous85k',
     {email: email, password: password, returnSecureToken: true}
    )
  }

  autoLogin() {
    const tmpUser: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
    const loadedUser = new User(tmpUser.email, tmpUser.id, tmpUser._token, new Date(tmpUser._tokenExpirationDate));
    if(loadedUser.token) {
      this.loggedUser.next(loadedUser);
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDogcg9Ou6cAAsdyONNQOu6LVXMHous85k',
      {email: email, password: password, returnSecureToken: true}
    )
    .pipe(tap(resData => {
      const expireDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expireDate);
      this.loggedUser.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }))
  }

  logOut() {
    if(!this.loggedUser) {
      return;
    } else {
      this.loggedUser.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/recipe']);
    }
  }

}
