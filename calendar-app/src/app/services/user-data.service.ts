import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Task } from '../models/task/task.model';
import { User } from '../models/user/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserDataService {

  private _appUrl = 'http://localhost:4200/API/';

  constructor(private http: Http) {}

  addUserToTask(user: User, task: Task): Observable<User> {
    console.log(user);
    console.log(task);
    const theUrl = this._appUrl + 'task/' + task.id + '/users';
    console.log(theUrl);
    return this.http.post(theUrl, user).map(res =>
      res.json()).map(item =>
      User.fromJSON(item));
  }

  addNewUser(user) {

  }

  findUser(id): User {
    return undefined;
  }
}
