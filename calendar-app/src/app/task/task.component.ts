import { Component, OnInit, Input } from '@angular/core';
import {Task} from './task.model';
import {User} from '../user/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() _task: Task;

  constructor() {}

  ngOnInit() {
  }

  get title(): string {
    return this._task.title;
  }

  get users(): User[] {
    return this._task.users;
  }

}
