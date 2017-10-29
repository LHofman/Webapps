import { Task } from '../task/task.model';
import { TaskDataService } from '../task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    const params = this.route.snapshot.params;
    this.day = new Date(params.year, params.month, params.day);
    this._tasks.push(...this.taskData.findTasksOnDate(this.day));
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

}
