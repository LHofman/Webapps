import { Group } from '../group/group.model';
import { UserDataService } from '../user-data.service';
import { Component, OnInit, Input } from '@angular/core';
import {Task} from './task.model';
import {User} from '../user/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [UserDataService]
})
export class TaskComponent implements OnInit {

  @Input() _task: Task;

  constructor(private _userDataService: UserDataService) {}

  ngOnInit() {
  }

  //#region getters

  get title(): string {
    return this._task.title;
  }

  get users(): User[] {
    return this._task.users;
  }

  get dateFormatted(): string {
    return this._task.date.toDateString();
  }

  get location(): string {
    return this._task.location;
  }

  get groups(): Group[] {
    return this._task.groups;
  }

  //#endregion getters

  newUserAdded(user) {
    this._userDataService.addNewUser(user);
    this._task.addUsers(user);
  }

}
