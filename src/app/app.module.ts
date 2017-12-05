import { TaskModule } from './task/task.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-accordion';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DayComponent } from './pages/day/day.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    ReactiveFormsModule, FormsModule,
    AngularMultiSelectModule,
    TaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
