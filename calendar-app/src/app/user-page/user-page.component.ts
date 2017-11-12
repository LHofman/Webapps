import { UserDataService } from '../user-data.service';
import { TaskDataService } from '../task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task/task.model';
import { User } from '../user/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  private _user: User;
  private _tasks: Task[];

  constructor(private route: ActivatedRoute,
    private userData: UserDataService,
    private taskData: TaskDataService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this._user = this.userData.findUser(params.userId);
    this._tasks = this.taskData.findTasksOfUser(this._user);
  }

  get user(): User {
    return this._user;
  }

  get name(): string {
    return this._user.firstname + ' ' + this._user.name;
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

}
