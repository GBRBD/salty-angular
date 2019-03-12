import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  loginForm: FormGroup;
  errorMessages = {
    emptyUsernameError: 'Please enter a username!',
    tooLongUsernameError: 'Username is too long! Max 12 character!',
    emptyEmailError: 'Please enter an E-mail address!',
    emptyPasswordError: 'Please enter a password!',
    tooLongPasswordError: 'Password is too long! Max 32 characters!'
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.ngZone.run(() => {
      this.authService
        .signIn(user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(err => console.log(err));
    });
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: this.initEmailField(),
      password: this.initPasswordField()
    });
  }

  private initEmailField(): any {
    return [null, [Validators.required, Validators.email]];
  }

  private initPasswordField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
    ];
  }
}
