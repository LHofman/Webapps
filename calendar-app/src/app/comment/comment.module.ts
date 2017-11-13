import { UserDataService } from '../user/user-data.service';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CommentComponent,
        AddCommentComponent
    ],
    exports: [
        CommentComponent,
        AddCommentComponent
    ],
    providers: [UserDataService]
})
export class CommentModule {}
