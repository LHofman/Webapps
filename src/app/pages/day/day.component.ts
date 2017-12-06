import { Observable } from 'rxjs/Rx';
import { UserDataService } from '../../task/user/user-data.service';
import { Task } from '../../task/task/task.model';
import { TaskDataService } from '../../task/task/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from '../../task/user/user.model';
import { AuthenticationService } from '../../task/user/authentication.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [AuthenticationService]
})
export class DayComponent implements OnInit {

  private day: Date;
  private _tasks: Task[];

  constructor(private route: ActivatedRoute,
    private auth: AuthenticationService,
    private taskData: TaskDataService,
    private userData: UserDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = new Date(params.year, params.month - 1, params.day);
      this._tasks = new Array<Task>();
      this.taskData.findTasksOnDate(this.day).subscribe(items => {
        this._tasks = new Array<Task>();
        const username = this.auth.user$.getValue();
        for (const task of items) {
          let add = false;
          if (task.author == username) {add = true; }
          for (const user of task.users) {
            if (user == username) {add = true; }
          }
          if (add) {this._tasks.push(task); }
        }
      });
    });
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

  newTaskAdded(task: Task) {
    this.taskData.addNewTask(task).subscribe(item => {
      this._tasks.push(item);
    });
  }

  get date(): string {
    return this.day.toDateString();
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

  private get previousDay(): Date {
    return new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() - 1);
  }

  private get nextDate(): Date {
    return new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1);
  }

  get prevDay(): number {
    return this.previousDay.getDate();
  }

  get prevMonth(): number {
    return this.previousDay.getMonth() + 1;
  }

  get prevYear(): number {
    return this.previousDay.getFullYear();
  }

  get nextDay(): number {
    return this.nextDate.getDate();
  }

  get nextMonth(): number {
    return this.nextDate.getMonth() + 1;
  }

  get nextYear(): number {
    return this.nextDate.getFullYear();
  }

}
