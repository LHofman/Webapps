import { Task } from './task/task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskDataService {

  private _tasks = new Array<Task>();

  constructor() {
    const task1 = new Task('Badminton', new Date(2017, 9, 16), 'Hamme (Meulenbroek)');
    const task2 = new Task('Rugby', new Date(2017, 9, 18), 'DRC (Dendermonde)');
    const task3 = new Task('Tennis', new Date(2017, 9, 21), 'Broeksken (Moerzeke)');
    this._tasks.push(task1, task2, task3);
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  addNewTask(task) {
    this._tasks.push(task);
  }

  findTasks(...titles): Task[] {
    return this._tasks.filter(task => titles.indexOf(task.title) > -1);
  }

  findTask(title): Task {
    return this._tasks.find(task => task.title === title);
  }

  findTasksOnDate(date): Task[] {
    return this._tasks.filter(task => {
      const _date = task.date;
      return _date.getFullYear() === date.getFullYear()
        && _date.getMonth() === date.getMonth()
        && _date.getDate() === date.getDate();
    });
  }

}
