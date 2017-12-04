import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { UserPageComponent } from '../task/user/user-page/user-page.component';
import { TaskPageComponent } from '../task/task/task-page/task-page.component';
import { DayComponent } from '../pages/day/day.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const today = new Date(Date.now());

const appRoutes: Routes = [
    {path: 'day/:year/:month/:day', component: DayComponent},
    {path: '', redirectTo: `day/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`, pathMatch: 'full'},
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
