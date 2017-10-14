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

  private _tasks: Task[];
  private _dates = new Array<Date>();

  constructor(private _userDataService: UserDataService,
    private _taskDataService: TaskDataService,
    private _groupDataService: GroupDataService,
    private _commentDataService: CommentDataService) {

    this._taskDataService.findTask('Badminton').addUsers(...this._userDataService.findUsers('Lennert', 'Jan'));
    this._taskDataService.findTask('Badminton').addGroups(...this._groupDataService.findGroups('Home', 'Badminton'));
    console.log(this._groupDataService);
    this._taskDataService.findTask('Rugby').addUsers(...this._userDataService.findUsers('Quinten', 'Marita'));
    this._taskDataService.findTask('Tennis').addUsers(...this._userDataService.findUsers('Gino', 'Marita'));

    this._groupDataService.findGroup('Home').addUsers(...this._userDataService.findUsers('Lennert', 'Quinten', 'Gino', 'Marita'));
    this._groupDataService.findGroup('Badminton').addUsers(...this._userDataService.findUsers('Lennert', 'Jan'));

    this._commentDataService.addComments(
      new Comment(this._userDataService.findUser('Lennert'), 'cool', 'I will defintely be there'),
      new Comment(this._userDataService.findUser('Jan'), 'same', 'Me too!')
    );
    this._commentDataService.findcomment('cool').addComments(this._commentDataService.findcomment('same'));

    this._taskDataService.findTask('Badminton').addComments(this._commentDataService.findcomment('cool'));

    this._tasks = this._taskDataService.tasks;

    for (let i = 16; i <= 21; i++) {
      this._dates.push(new Date(2017, 9, i));
    }

  }

  newTaskAdded(task) {
    this._taskDataService.addNewTask(task);
  }

  get dates(): string[] {
    return this._dates.map(date => date.toDateString());
  }

  tasksForDate(date): Task[] {
    return this._taskDataService.findTasksOnDate(new Date(date));
  }

}
