import { TaskModule } from './task/task.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'ngx-accordion';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DayComponent } from './pages/day/day.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { WeekComponent } from './pages/week/week.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PageNotFoundComponent,
    WeekComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    TaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
