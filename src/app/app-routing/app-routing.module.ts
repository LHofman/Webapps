import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { UserPageComponent } from '../task/user/user-page/user-page.component';
import { TaskPageComponent } from '../task/task/task-page/task-page.component';
import { DayComponent } from '../pages/day/day.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const today = new Date(Date.now());
const redirect = 'day/' + today.getFullYear()
  + '/' + (today.getMonth() + 1)
  + '/' + today.getDate();

const appRoutes: Routes = [
    // {
    //     path: 'task',
    //     loadChildren: '../task/task.module#TaskModule'
    // },
    {path: '', redirectTo: redirect, pathMatch: 'full'},
    {path: 'day/:year/:month/:day', component: DayComponent},
    {path: '**', component: PageNotFoundComponent}];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}