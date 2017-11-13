import { Comment } from './comment.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentDataService {

  private _comments = new Array<Comment>();

    constructor() {}

    get comments(): Comment[] {
      return this._comments;
    }

    addComments(...comments) {
      for (const comment of comments) {
        this._comments.push(comment);
      }
    }

    findcomment(title): Comment {
      return this._comments.find(comment => comment.title === title);
    }

    findcomments(...titles): Comment[] {
      return this._comments.filter(comment => titles.indexOf(comment.title) > -1);
    }

}
