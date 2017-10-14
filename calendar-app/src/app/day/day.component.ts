import { Component, OnInit, Input } from '@angular/core';
import {Day} from './day.model';
import {Task} from '../task/task.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() _day: Day;

  constructor() { }

  ngOnInit() {
  }

  get dateFormatted(): string {
    return this._day.date.toDateString();
  }

  get tasks(): Task[] {
    return this._day.tasks;
  }

}
