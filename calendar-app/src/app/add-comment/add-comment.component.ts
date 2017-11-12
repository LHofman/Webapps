import { User } from '../user/user.model';
import { Component, Output, EventEmitter } from '@angular/core';
import {Comment} from '../comment/comment.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  @Output() public newComment = new EventEmitter<Comment>();

    addComment(newCommentTitle: HTMLInputElement, newCommentBody: HTMLInputElement): boolean {
      const comment = new Comment(new User(9, 'Other', 'User'), newCommentTitle.value, newCommentBody.value);
      this.newComment.emit(comment);
      return false;
    }

}
