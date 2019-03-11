import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('emailFormDirective') emailFormDirective: FormGroupDirective;
  @ViewChild('passwordFormDirective') passwordFormDirective: FormGroupDirective;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  user: User;
  private updateEmailSub: Subscription;
  private updatePasswordSub: Subscription;

  errorMessages = {
    emptyUsernameError: 'Please enter a username!',
    tooLongUsernameError: 'Username is too long! Max 12 character!',
    emptyEmailError: 'Please enter an E-mail address!',
    emptyPasswordError: 'Please enter a password!',
    tooLongPasswordError: 'Password is too long! Max 32 characters!',
    passwordDontMatch: 'Your password and confirmation password do not match!',
    wrongPassword: 'Wrong password 😞',
    emailUpdated: 'Your e-mail address has been updated successfully‏!',
    tryAgainLater:
      'There was an error. Please try again later. That’s all we know.',
    passwordsNotMatch: `New password and confirm password don't match`,
    passwordUpdated: 'Your password has been updated successfully‏!'
  };

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.initializeEmailForm();
    this.initializePasswordForm();
  }

  ngOnDestroy() {
    if (this.updateEmailSub) {
      this.updateEmailSub.unsubscribe();
    }
    if (this.updatePasswordSub) {
      this.updatePasswordSub.unsubscribe();
    }
  }

  onChangePasswordSubmit() {
    this.changePassword();
  }

  onChangeEmailSubmit() {
    this.changeEmail();
  }

  private initializeEmailForm() {
    this.emailForm = this.fb.group({
      email: this.initEmailField(),
      password: this.initPasswordField()
    });
  }

  private initializePasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: this.initPasswordField(),
      newPassword: this.initPasswordField(),
      confirmPassword: this.initPasswordField()
    });
  }

  private changePassword() {
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.showSnackBar(this.errorMessages.passwordsNotMatch);
    } else {
      this.authService
        .reauthenticateAndRetrieveDataWithCredential(
          this.user.email,
          this.currentPassword.value
        )
        .then(() => {
          return this.authService.updatePassword(this.newPassword.value);
        })
        .then(() => {
          this.resetForm(this.passwordForm, this.passwordFormDirective);
          this.showSnackBar(this.errorMessages.passwordUpdated);
        })
        .catch(error => {
          this.catchErrors(error);
        });
    }
  }

  private changeEmail() {
    this.authService
      .reauthenticateAndRetrieveDataWithCredential(
        this.user.email,
        this.emailFormPassword.value
      )
      .then(() => {
        return this.updateEmailInFirebase();
      })
      .then(() => {
        this.resetFormAndUpdateEmailInDatabase();
      })
      .catch(error => {
        this.catchErrors(error);
      });
  }

  private initEmailField(): any {
    return [this.user.email, [Validators.required, Validators.email]];
  }

  private initPasswordField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
    ];
  }

  private updateEmailInFirebase(): void | PromiseLike<void> {
    return this.authService.updateEmail(this.email.value);
  }

  private resetFormAndUpdateEmailInDatabase() {
    this.resetForm(this.emailForm, this.emailFormDirective);
    this.updateEmailSub = this.userService
      .updateUserEmail(this.email.value)
      .pipe(take(1))
      .subscribe(
        response => this.showSnackBar(this.errorMessages.emailUpdated),
        error => this.showSnackBar(this.errorMessages.tryAgainLater)
      );
  }

  private catchErrors(error: any) {
    if (error.code === 'auth/wrong-password') {
      this.showSnackBar(this.errorMessages.wrongPassword);
    } else {
      this.showSnackBar(this.errorMessages.tryAgainLater);
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }

  private resetForm(
    formGroup: FormGroup,
    formGroupDirective: FormGroupDirective
  ) {
    formGroup.reset();
    formGroupDirective.resetForm();
  }

  get email() {
    return this.emailForm.get('email');
  }

  get emailFormPassword() {
    return this.emailForm.get('password');
  }

  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
}
