import { CommentDataService } from './comment/comment-data.service';
import { CommentComponent } from './comment/comment/comment.component';
import { UserComponent } from './user/user/user.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { RouterModule, RouterLink } from '@angular/router';
import { TaskDataService } from './task/task-data.service';
import { TaskResolver } from './task.resolver';
import { AccordionModule } from 'ngx-accordion';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { TaskComponent } from './task/task/task.component';
import { NgModule } from '@angular/core';
import { AddCommentComponent } from './comment/add-comment/add-comment.component';
import { UserDataService } from './user/user-data.service';
import { AuthenticationService } from './user/authentication.service';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ReactiveFormsModule, FormsModule,
        RouterModule,
        AccordionModule,
        AngularMultiSelectModule
    ],
    declarations: [
        TaskComponent,
        AddTaskComponent,
        UserComponent,
        UserPageComponent,
        CommentComponent,
        AddCommentComponent
    ],
    exports: [
        TaskComponent,
        AddTaskComponent
    ],
    providers: [
        TaskDataService,
        UserDataService,
        CommentDataService,
        TaskResolver,
        AuthenticationService
    ]
})
export class TaskModule {}
