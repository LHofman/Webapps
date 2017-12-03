import { Observable } from 'rxjs/Rx';
import { UserDataService } from '../../task/user/user-data.service';
import { Task } from '../../task/task/task.model';
import { TaskDataService } from '../../task/task/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from '../../task/user/user.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  private day: Date;
  private _tasks: Task[];

  constructor(private route: ActivatedRoute,
    private taskData: TaskDataService,
    private userData: UserDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = new Date(params.year, params.month - 1, params.day);
      this._tasks = new Array<Task>();
      this.taskData.findTasksOnDate(this.day).subscribe(items =>
        this._tasks = items);
    });
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
      const user = task.users.map(usr =>
        this.userData.addUserToTask(usr, item));

      this._tasks.push(item);

      // Observable.forkJoin(...user).subscribe(
      //   (users: User[]) => {
      //     for (const usr of users) {
      //       item.users.push(usr);
      //     }
      //     return this._tasks.push(item);
      //   }
      // );
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
    const prev = new Date();
    prev.setDate(this.day.getDate() - 1);
    return prev;
  }

  private get nextDate(): Date {
    const next = new Date();
    next.setDate(this.day.getDate() + 1);
    return next;
  }

  get prevDay(): number {
    return this.previousDay.getDate();
  }

  get prevMonth(): number {
    return this.previousDay.getMonth();
  }

  get prevYear(): number {
    return this.previousDay.getFullYear();
  }

  get nextDay(): number {
    return this.nextDate.getDate();
  }

  get nextMonth(): number {
    return this.nextDate.getMonth();
  }

  get nextYear(): number {
    return this.nextDate.getFullYear();
  }

}
