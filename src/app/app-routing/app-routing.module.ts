import { LoginComponent } from '../pages/login/login.component';
import { AuthGuardService } from './AuthGuardService';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { UserPageComponent } from '../task/user/user-page/user-page.component';
import { DayComponent } from '../pages/day/day.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register/register.component';

const today = new Date(Date.now());

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'day/:year/:month/:day', component: DayComponent, canActivate: [AuthGuardService]},
    {path: 'profile', component: UserPageComponent},
    {path: '', redirectTo: `day/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`, pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ],
    providers: [AuthGuardService]
})
export class AppRoutingModule {}
