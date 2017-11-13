import { CommentDataService } from '../../services/comment-data.service';
import { UserDataService } from '../../services/user-data.service';
import { Comment } from '../../models/comment/comment.model';
import { User } from '../../models/user/user.model';
import { TaskDataService } from '../../services/task-data.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  private _task: Task;

  constructor(private route: ActivatedRoute,
    private taskData: TaskDataService,
    private userData: UserDataService,
    private commentData: CommentDataService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this._task = this.taskData.findTask(params.taskId);
  }

  get title(): string {
    return this._task.title;
  }

  get task(): Task {
    return this._task;
  }

  get location(): string {
    return this._task.location;
  }

  getTime(): string {
    const startTime = this._task.startTime, endTime = this._task.endTime;
    return startTime.toDateString() + ' '
      + startTime.toLocaleTimeString() + ' - '
      + endTime.toDateString() + ' '
      + endTime.toLocaleTimeString();
  }

  get users(): User[] {
    return this._task.users;
  }

  get comments(): Comment[] {
    return this._task.comments;
  }

  newUserAdded(user) {
    this.userData.addNewUser(user);
    this._task.users.push(user);
  }

  newCommentAdded(comment) {
    this.commentData.addComments(comment);
    this._task.comments.push(comment);
  }

}
