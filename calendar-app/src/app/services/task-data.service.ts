import { Comment } from '../models/comment/comment.model';
import { User } from '../models/user/user.model';
import { Task } from '../models/task/task.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskDataService {

  private _appUrl = 'http://localhost:4200/API/tasks/';

  constructor(private http: Http) {}

  get tasks(): Observable<Task[]> {
    return this.http.get(this._appUrl).map(response =>
      response.json().map(item =>
        new Task(item._id, item.title, new Date(item.startTime), new Date(item.endTime), item.location)
      )
    );
  }

  addNewTask(task): Observable<Task> {
    console.log(task);
    return this.http.post(this._appUrl, task).map(res =>
      res.json()).map(item =>
        new Task(item._id, item.title, new Date(item.startTime), new Date(item.endTime), item.location));
  }

  addUserToTask(user: User, task: Task): Observable<User> {
    const theUrl = '${this._appUrl}/task/${task.id}/users';
    return this.http.post(theUrl, user).map(res =>
      res.json()).map(item =>
      User.fromJSON(item));
  }

  findTask(taskId: number): Task {
    // tslint:disable-next-line:triple-equals
    // return this._tasks.find(task => task.id == taskId);
    return undefined;
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
