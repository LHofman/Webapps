import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../task/user/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public passwordGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.passwordGroup = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator(12)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords });


    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.passwordGroup
    });
  }

  passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length ? { 'passwordTooShort':
        { requiredLength: length, actualLength: control.value.length }} : null;
    };
  }

  comparePasswords(control: AbstractControl): {  [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true};
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService.checkUserNameAvailability(control.value).map(available => {
        if (available) {return null; }
        return { userAlreadyExists: true };
      });
    };
  }

  onSubmit() {
    console.log('submitting');
    this.authenticationService.register(this.user.value.username, this.passwordGroup.value.password).subscribe(val => {
      if (val) {
        this.router.navigate(['/']);
      } else {
        console.log('username or password is incorrect');
      }
    }, err => console.log(err));
  }

  login() {
    this.router.navigate(['/login']);
  }

}
