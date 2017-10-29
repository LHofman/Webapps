import { Comment } from './comment/comment.model';
import { CommentDataService } from './comment-data.service';
import { GroupDataService } from './group-data.service';
import { TaskDataService } from './task-data.service';
import { UserDataService } from './user-data.service';
import { Component } from '@angular/core';
import {Task} from './task/task.model';
import {User} from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserDataService, TaskDataService, GroupDataService, CommentDataService]
})
export class AppComponent {

  constructor() {

  }

}
