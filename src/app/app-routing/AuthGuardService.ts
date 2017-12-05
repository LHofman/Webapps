import { AuthenticationService } from '../task/user/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('currentUser')) {return true; }
        // if (this.authService.user$.getValue()) {return true; }
        // this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    }
}
