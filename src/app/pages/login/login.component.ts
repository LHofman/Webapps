import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../task/user/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: String;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.user.value.username, this.user.value.password).subscribe(val => {
      if (val) {
        this.errorMsg = '';
        this.router.navigate(['/']);
      } else {
        this.errorMsg = 'username or password is incorrect';
      }
    }, err => this.errorMsg = 'username or password is incorrect');
  }

  register() {
    this.router.navigate(['/register']);
  }

}
