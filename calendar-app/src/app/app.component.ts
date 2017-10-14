import { Component } from '@angular/core';
import {Task} from './task/task.model';
import {User} from './user/user.model';
import {Day} from './day/day.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _days = new Array<Day>();

  constructor() {
    const _tasks = new Array<Task>();
    const task1 = new Task('Badminton');
    task1.addUsers(new User('Lennert'), new User('Jan'));
    const task2 = new Task('Rugby');
    task2.addUsers(new User('Quinten'), new User('Gino'), new User('Marita'));
    _tasks.push(task1, task2);

    const day1 = new Day(new Date(2017, 10, 14));
    day1.addTasks(task1, task2);
    const day2 = new Day(new Date(2017, 10, 16));
    day2.addTasks(task2);

    this._days.push(day1, day2);

  }

}
