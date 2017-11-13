import { User } from './user/user.model';
import { Observable } from 'rxjs/Rx';
import { Comment } from './comment/comment.model';
import { CommentDataService } from './comment/comment-data.service';
import { GroupDataService } from './group/group-data.service';
import { TaskDataService } from './task/task-data.service';
import { UserDataService } from './user/user-data.service';
import { Component, OnInit } from '@angular/core';
import {Task} from './task/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserDataService, TaskDataService, GroupDataService, CommentDataService]
})
export class AppComponent implements OnInit {

  private _tasks: Task[];

  constructor(private taskData: TaskDataService,
    private userData: UserDataService) {}

  ngOnInit() {
    this.taskData.tasks.subscribe(items =>
      this._tasks = items);
  }

  get tasks(){
    return this._tasks;
  }

  newTaskAdded(task) {
    this.taskData.addNewTask(task).subscribe(item => {
      const user = task.users.map(usr =>
        this.userData.addUserToTask(usr, item));

      Observable.forkJoin(...user).subscribe(
        (users: User[]) => {
          for (const usr of users) {
            item.users.push(usr);
          }
          return this._tasks.push(item);
        }
      );
    });
  }

}
