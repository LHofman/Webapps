import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  public token: string;
  private _appUrl = '/API/users';
  private _user$: BehaviorSubject<String>;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<String>(
      currentUser && currentUser.username);
    this.token = currentUser && currentUser.token;
  }

  get user$(): BehaviorSubject<String> {
    return this._user$;
  }

  login(username: String, password: String): Observable<boolean> {
    return this.http.post(`${this._appUrl}/login`,
    {username: username, password: password}).map(res =>
      res.json()).map(res => {
        const token = res.token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser',
            JSON.stringify({username: username, token: token}));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  register(username: String, password: String): Observable<boolean> {
    console.log('registering');
    console.log('username: ' + username + ', password: ' + password);
    return this.http.post(`${this._appUrl}/register`,
    {username: username, password: password}).map(res =>
      res.json()).map(res => {
        const token = res.token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser',
            JSON.stringify({username: username, token: res.token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._appUrl}/checkusername`,
    {username: username}).map(res => res.json()).map(item => {
      if (item.username === 'alreadyexists') {return false; }
      return true;
    });
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

}
