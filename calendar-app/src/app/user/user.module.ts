import { AddCommentComponent } from '../comment/add-comment/add-comment.component';
import { UserDataService } from './user-data.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserPageComponent } from './user-page/user-page.component';
import { NgModule } from '@angular/core';

const routes = [
    {path: 'user/:userId', component: UserPageComponent}
];

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule, // ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        UserComponent,
        AddUserComponent,
        UserPageComponent
    ],
    exports: [
        UserComponent,
        AddUserComponent,
        UserPageComponent
    ],
    providers: [UserDataService]
})
export class UserModule {}
