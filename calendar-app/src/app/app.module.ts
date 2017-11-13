import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-accordion';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { TaskComponent } from './models/task/task.component';
import { UserComponent } from './models/user/user.component';
import { AddUserComponent } from './forms/add-user/add-user.component';
import { AddTaskComponent } from './forms/add-task/add-task.component';
import { GroupComponent } from './models/group/group.component';
import { CommentComponent } from './models/comment/comment.component';
import { AddCommentComponent } from './forms/add-comment/add-comment.component';
import { DayComponent } from './pages/day/day.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const appRoutes = [
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
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
