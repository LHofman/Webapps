import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    UserComponent,
    DayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
