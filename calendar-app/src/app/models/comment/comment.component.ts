import { CommentDataService } from '../../services/comment-data.service';
import { User } from '../user/user.model';
import { Comment } from './comment.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentDataService]
})
export class CommentComponent implements OnInit {

  @Input() _comment: Comment;

  constructor(private _commentDataService: CommentDataService) { }

  ngOnInit() {
  }

  get author(): User {
    return this._comment.author;
  }

  get title(): string {
    return this._comment.title;
  }

  get body(): string {
    return this._comment.body;
  }

  get comments(): Comment[] {
    return this._comment.comments;
  }

  newCommentAdded(comment) {
    this._commentDataService.addComments(comment);
    this._comment.addComments(comment);
  }

}
