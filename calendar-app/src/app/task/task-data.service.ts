import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskDataService {

  private _appUrl = 'http://localhost:4200/API/';

  constructor(private http: Http) {}

  get tasks(): Observable<Task[]> {
    return this.http.get(this._appUrl + 'tasks/').map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  addNewTask(task): Observable<Task> {
    console.log(task);
    return this.http.post(this._appUrl + 'tasks/', task).map(res =>
      res.json()).map(item =>
        Task.fromJSON(item));
  }

  getTask(id): Observable<Task> {
    return this.http.get(this._appUrl + 'task/' + id).map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  findTasksOnDate(date): Task[] {
    // return this._tasks.filter(task => {
    //   const _startTime = task.startTime;
    //   const _endTime = task.endTime;
    //   return date.getFullYear() >= _startTime.getFullYear()
    //     && date.getFullYear() <= _endTime.getFullYear()
    //     && date.getMonth() >= _startTime.getMonth()
    //     && date.getMonth() <= _endTime.getMonth()
    //     && date.getDate() >= _startTime.getDate()
    //     && date.getDate() <= _endTime.getDate();
    // }).sort((a, b) => (a.startTime <= b.startTime) ? -1 : 1);
    return undefined;
  }

  findTasksOfUser(user): Task[] {
    // return this._tasks.filter(task => {
    //   for (const _user of task.users) {
    //     return _user.id === user.id;
    //   }
    // }).sort((a, b) => (a.startTime <= b.startTime) ? -1 : 1);
    return undefined;
  }

}
