import { UserDataService } from '../../user/user-data.service';
import { TaskDataService } from '../../task/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../task/task.model';
import { User } from '../../user/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [AuthenticationService, TaskDataService]
})
export class UserPageComponent implements OnInit {

  private _username: String;
  private _tasks = new Array<Task>();

  constructor(private route: ActivatedRoute,
    private auth: AuthenticationService,
    private userData: UserDataService,
    private taskData: TaskDataService) { }

  ngOnInit() {
    this._username = this.auth.user$.getValue();
    this.taskData.tasks.subscribe(items => {
      this._tasks = new Array<Task>();
      for (const task of items) {
        let add = false;
        if (task.author == this._username) {add = true; }
        for (const user of task.users) {
          if (user == this._username) {add = true; }
        }
        if (add) {this._tasks.push(task); }
      }
    });
  }

  get username(): String {
    return this._username;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  getTime(startTime: Date, endTime: Date): string {
    const sameDate = startTime.toDateString() === endTime.toDateString();
    return (sameDate ? '' : (startTime.toDateString() + ' '))
      + startTime.toLocaleTimeString() + ' - '
      + (sameDate ? '' : (endTime.toDateString() + ' '))
      + endTime.toLocaleTimeString();
  }

  newTaskAdded(task) {
    this.taskData.addNewTask(task);
    this._tasks.push(task);
  }

  isAuthor(task: Task): boolean {
    return task.author == this.auth.user$.getValue();
  }

  removeTask(task: Task) {
    this.taskData.removeTask(task.id).subscribe(
      result => {
        this._tasks.splice(this._tasks.indexOf(task), 1);
      },
      error => console.log(error)
    );
  }

}
