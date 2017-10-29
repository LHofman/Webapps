import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-accordion';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { GroupComponent } from './group/group.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { DayComponent } from './day/day.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const appRoutes = [
  {path: '/'},
  {path: 'day/:year/:month/:day', component: DayComponent},
  {path: 'task/:taskId', component: TaskPageComponent},
  {path: 'user/:userId', component: UserPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    UserComponent,
    AddUserComponent,
    AddTaskComponent,
    GroupComponent,
    CommentComponent,
    AddCommentComponent,
    DayComponent,
    TaskPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
