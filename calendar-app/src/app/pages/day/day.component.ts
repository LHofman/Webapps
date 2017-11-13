import { Task } from '../../models/task/task.model';
import { TaskDataService } from '../../services/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  private day: Date;
  private _tasks = new Array<Task>();

  constructor(private route: ActivatedRoute,
    private taskData: TaskDataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = new Date(params.year, params.month, params.day);
      this._tasks = this.taskData.findTasksOnDate(this.day);
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
