import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import { Task } from '../task/task.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserDataService {

  private _appUrl = '/API/';

  constructor(private http: Http,
    private auth: AuthenticationService) {}

  addUserToTask(user: User, task: Task): Observable<User> {
    const theUrl = this._appUrl + 'task/' + task.id + '/users';
    return this.http.post(theUrl, user,
      {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res =>
      res.json()).map(item =>
      User.fromJSON(item));
  }

  findUser(id): User {
    return undefined;
  }
}
