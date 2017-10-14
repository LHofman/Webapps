import { TaskDataService } from './task-data.service';
import { UserDataService } from './user-data.service';
import { Component } from '@angular/core';
import {Task} from './task/task.model';
import {User} from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserDataService, TaskDataService]
})
export class AppComponent {

  private _tasks: Task[];
  private _dates = new Array<Date>();

  constructor(private _userDataService: UserDataService,
    private _taskDataService: TaskDataService) {

    this._taskDataService.addUsers(this._taskDataService.findTask('Badminton'), ...this._userDataService.findUsers('Lennert'));
    this._taskDataService.addUsers(this._taskDataService.findTask('Rugby'), ...this._userDataService.findUsers('Quinten', 'Marita'));
    this._taskDataService.addUsers(this._taskDataService.findTask('Tennis'), ...this._userDataService.findUsers('Gino', 'Marita'));

    this._tasks = this._taskDataService.tasks;

    for (let i = 16; i <= 22; i++) {
      this._dates.push(new Date(2017, 9, i));
    }

  }

  newTaskAdded(task) {
    this._taskDataService.addNewTask(task);
  }

  get dates(): string[] {
    return this._dates.map(date => date.toDateString());
  }

  tasksForDate(date): Task[] {
    return this._taskDataService.findTasksOnDate(new Date(date));
  }

}
