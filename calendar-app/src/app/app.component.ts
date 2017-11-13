import { User } from './models/user/user.model';
import { Observable } from 'rxjs/Rx';
import { Comment } from './models/comment/comment.model';
import { CommentDataService } from './services/comment-data.service';
import { GroupDataService } from './services/group-data.service';
import { TaskDataService } from './services/task-data.service';
import { UserDataService } from './services/user-data.service';
import { Component, OnInit } from '@angular/core';
import {Task} from './models/task/task.model';

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
    console.log(task);
    this.taskData.addNewTask(task).subscribe(item => {
      console.log(task);
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
