import { Comment } from './comment.model';
import { Injectable } from '@angular/core';
import { Task } from '../task/task.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentDataService {

  private _comments = new Array<Comment>();

  private _appUrl = '/API/';

  constructor(private http: Http) { }

  commentsFromTask(task: Task): Observable<Comment[]> {
    const theUrl = this._appUrl + 'task/' + task.id + '/comments';
    return this.http.get(theUrl).map(response =>
      response.json().map(item =>
        Comment.fromJSON(item)));
  }

  addCommentToTask(comment: Comment, task: Task): Observable<Comment> {
    const theUrl = this._appUrl + 'task/' + task.id + '/comments';
    return this.http.post(theUrl, comment).map(res =>
      res.json()).map(item =>
        Comment.fromJSON(item));
  }
}
