import { AuthenticationService } from '../user/authentication.service';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskDataService {

  private _appUrl = '/API/';

  constructor(private http: Http,
    private auth: AuthenticationService) {}

  get tasks(): Observable<Task[]> {
    return this.http.get(this._appUrl + 'tasks/',
    {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  addNewTask(task): Observable<Task> {
    return this.http.post(this._appUrl + 'tasks/', task,
    {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res =>
      res.json()).map(item =>
        Task.fromJSON(item));
  }

  getTask(id): Observable<Task> {
    return this.http.get(this._appUrl + 'task/' + id,
    {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response =>
      response.json().map(item =>
        Task.fromJSON(item)));
  }

  findTasksOnDate(date1: Date, date2?: Date): Observable<Task[]> {
    return this.http.get(this._appUrl + 'tasks/' + date1 + (date2 ? ('/' + date2) : ''),
    {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response => {
      return response.json().map(item =>
        Task.fromJSON(item)); } );
  }

  removeTask(id): Observable<String> {
    return this.http.delete(this._appUrl + 'task/' + id,
    {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response =>
      response.json());
  }

  findTasksOfUser(user): Task[] {
    return undefined;
  }

}
