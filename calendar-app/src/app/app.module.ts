import { UserComponent } from './user/user/user.component';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-accordion';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DayComponent } from './pages/day/day.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    UserModule,
    TaskModule,
    GroupModule,
    CommentModule,
    AppRoutingModule
  ],
  exports: [
    UserModule,
    TaskModule,
    GroupModule,
    CommentModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
