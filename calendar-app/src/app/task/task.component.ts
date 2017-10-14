import { CommentDataService } from '../comment-data.service';
import { Comment } from '../comment/comment.model';
import { Group } from '../group/group.model';
import { UserDataService } from '../user-data.service';
import { Component, OnInit, Input } from '@angular/core';
import {Task} from './task.model';
import {User} from '../user/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [UserDataService, CommentDataService]
})
export class TaskComponent implements OnInit {

  @Input() _task: Task;

  constructor(private _userDataService: UserDataService,
    private _commentDataService: CommentDataService) {}

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

  get comments(): Comment[] {
    return this._task.comments;
  }

  //#endregion getters

  newUserAdded(user) {
    this._userDataService.addNewUser(user);
    this._task.addUsers(user);
  }

  newCommentAdded(comment) {
    this._commentDataService.addComments(comment);
    this._task.addComments(comment);
  }

}
