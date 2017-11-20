import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from '../../task/task/task.model';
import { ActivatedRoute } from '@angular/router';
import { TaskDataService } from '../../task/task/task-data.service';
import { UserDataService } from '../../task/user/user-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TaskDataService]
})
export class WeekComponent implements OnInit {

  private day1: Date;
  private _tasks = new Array();

  constructor(private route: ActivatedRoute,
    private taskData: TaskDataService) { }

  get days(): Date[] {
    const days = new Array<Date>();
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(this.day1.getDate() + i);
      day.setHours(0, 0, 0);
      days.push(day);
      this._tasks[i] = this.taskData.findTasksOnDate(day);
    }
    return days;
  }

  getTasks(i) {
    console.log(this._tasks);
    console.log(i);
    return this._tasks[i];
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.day1 = new Date(params.year, params.month, params.day, 0, 0, 0);
  }

  get week(): String {
    const thursday = new Date();
    thursday.setDate(this.day1.getDate() + 2);
    const week1 = new Date(thursday.getFullYear(), 0, 4);
    return 'Week ' + (1 + Math.round(((thursday.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7))
      + ' ' + thursday.getFullYear();
  }

  private get previousDay(): Date {
    const prev = new Date();
    prev.setDate(this.day1.getDate() - 7);
    return prev;
  }

  private get nextDate(): Date {
    const next = new Date();
    next.setDate(this.day1.getDate() + 7);
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
