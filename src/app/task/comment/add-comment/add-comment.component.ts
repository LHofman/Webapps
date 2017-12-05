import { User } from '../../user/user.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {Comment} from '../../comment/comment.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [AuthenticationService]
})
export class AddCommentComponent implements OnInit {

  @Output() public newComment = new EventEmitter<Comment>();
  public comment: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService) {}

  ngOnInit() {
    this.comment = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      body: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const value = this.comment.value;
    if (!(value.title && value.body)) {return; }
    const comment = new Comment(0, this.auth.user$.getValue(), value.title, value.body);
    this.newComment.emit(comment);
  }

}
