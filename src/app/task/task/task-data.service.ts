import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskDataService {

  private _appUrl = '/API/';

  constructor(private http: Http) {}

  get tasks(): Observable<Task[]> {
    return this.http.get(this._appUrl + 'tasks/').map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  addNewTask(task): Observable<Task> {
    return this.http.post(this._appUrl + 'tasks/', task).map(res =>
      res.json()).map(item =>
        Task.fromJSON(item));
  }

  getTask(id): Observable<Task> {
    return this.http.get(this._appUrl + 'task/' + id).map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  findTasksOnDate(date1: Date, date2?: Date): Observable<Task[]> {
    return this.http.get(this._appUrl + 'tasks/' + date1 + (date2 ? ('/' + date2) : '')).map(response => {
      console.log(response.json());
      return response.json().map(item =>
        Task.fromJSON(item)); } );
  }

  removeTask(id): Observable<String> {
    return this.http.delete(this._appUrl + 'task/' + id).map(response =>
      response.json());
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
