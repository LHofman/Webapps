import { User } from '../../user/user.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import {Comment} from '../../comment/comment.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() public newComment = new EventEmitter<Comment>();
  public comment: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.comment = this.fb.group({
      title: ['Comment', [Validators.required, Validators.minLength(2)]],
      body: ['Body', [Validators.required]]
    });
  }

  onSubmit() {
    const value = this.comment.value;
    const comment = new Comment(0, undefined, value.title, value.body);
    this.newComment.emit(comment);
  }

}
