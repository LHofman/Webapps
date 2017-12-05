import { CommentDataService } from '../../comment/comment-data.service';
import { Comment } from '../../comment/comment.model';
import { UserDataService } from '../../user/user-data.service';
import { Component, OnInit, Input } from '@angular/core';
import {Task} from '../task.model';
import {User} from '../../user/user.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [UserDataService, CommentDataService, AuthenticationService]
})
export class TaskComponent implements OnInit {

  @Input() _task: Task;

  constructor(private _userDataService: UserDataService,
    private auth: AuthenticationService,
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

  get startTime(): string {
    return this.getTime(this.startDate);
  }

  get endTime(): string {
    return this.getTime(this.endDate);
  }

  private getTime(time: Date): string {
    return time.toDateString() + ' ' + time.toLocaleTimeString();
  }

  get startDate(): Date {
    return this._task.startTime;
  }

  get endDate(): Date {
    return this._task.endTime;
  }

  get location(): string {
    return this._task.location;
  }

  get comments(): Comment[] {
    return this._task.comments;
  }

  //#endregion getters

  newCommentAdded(comment: Comment) {
    this._commentDataService.addCommentToTask(comment, this._task).subscribe(item => {
      this._task.comments.push(item);
    });
  }

  isAuthor(comment: Comment): boolean {
    return comment.author == this.auth.user$.getValue();
  }

}
