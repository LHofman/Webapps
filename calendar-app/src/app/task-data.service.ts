import { Comment } from './comment/comment.model';
import { User } from './user/user.model';
import { Task } from './task/task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskDataService {

  private _tasks = new Array<Task>();

  constructor() {
    const task1 = new Task(1, 'Badminton', new Date(2017, 9, 16, 20, 0), new Date(2017, 9, 16, 23, 0), 'Hamme (Meulenbroek)');
    const task2 = new Task(2, 'Rugby', new Date(2017, 9, 16, 20, 0), new Date(2017, 9, 16, 22, 0), 'DRC (Dendermonde)');
    const task3 = new Task(3, 'Tennis', new Date(2017, 9, 16, 10, 0), new Date(2017, 9, 17, 12, 0), 'Broeksken (Moerzeke)');
    const lennert = new User(1, 'Lennert', 'Hofman');
    task1.addUsers(lennert);
    task1.addComments(new Comment(new User(2, 'Quinten', 'Hofman'), 'i wanna go', 'i\'m jealous'));
    this._tasks.push(task1, task2, task3);
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  addNewTask(task) {
    this._tasks.push(task);
  }

  findTask(taskId: number): Task {
    // tslint:disable-next-line:triple-equals
    return this._tasks.find(task => task.id == taskId);
  }

  findTasksOnDate(date): Task[] {
    return this._tasks.filter(task => {
      const _startTime = task.startTime;
      const _endTime = task.endTime;
      return date.getFullYear() >= _startTime.getFullYear()
        && date.getFullYear() <= _endTime.getFullYear()
        && date.getMonth() >= _startTime.getMonth()
        && date.getMonth() <= _endTime.getMonth()
        && date.getDate() >= _startTime.getDate()
        && date.getDate() <= _endTime.getDate();
    }).sort((a, b) => (a.startTime <= b.startTime) ? -1 : 1);
  }

  findTasksOfUser(user): Task[] {
    return this._tasks.filter(task => {
      for (const _user of task.users) {
        return _user.id === user.id;
      }
    }).sort((a, b) => (a.startTime <= b.startTime) ? -1 : 1);
  }

}
