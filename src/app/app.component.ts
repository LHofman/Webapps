import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './task/user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {

  currentUser: string;

  constructor(private auth: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (this.currentUser) {return true; }
    return false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
