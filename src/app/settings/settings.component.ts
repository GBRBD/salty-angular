import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('emailFormDirective') emailFormDirective: FormGroupDirective;
  @ViewChild('passwordFormDirective') passwordFormDirective: FormGroupDirective;
  @ViewChild('usernameFormDirective') usernameFormDirective: FormGroupDirective;

  user: User;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  usernameForm: FormGroup;
  private updateEmailSub: Subscription;
  private updatePasswordSub: Subscription;
  private updateUsernameSub: Subscription;
  private getUsernameSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    public helperService: HelperService
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.getUsernameSub = this.userService
      .getUserFromDatabase()
      .subscribe((user: User) => {
        this.username.setValue(user.username);
      });
  }

  ngOnInit() {
    this.initializeUsernameForm();
    this.initializeEmailForm();
    this.initializePasswordForm();
  }

  ngOnDestroy() {
    this.unsubscribeFromEverything();
  }

  onChangeUsernameSubmit() {
    this.changeUsername();
  }

  onChangePasswordSubmit() {
    this.changePassword();
  }

  onChangeEmailSubmit() {
    this.changeEmail();
  }

  private initializeUsernameForm() {
    this.usernameForm = this.fb.group({
      username: this.initUsernameField()
    });
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

  private unsubscribeFromEverything() {
    if (this.updateEmailSub) {
      this.updateEmailSub.unsubscribe();
    }
    if (this.updatePasswordSub) {
      this.updatePasswordSub.unsubscribe();
    }
    if (this.updateUsernameSub) {
      this.updateUsernameSub.unsubscribe();
    }
    if (this.getUsernameSub) {
      this.getUsernameSub.unsubscribe();
    }
  }

  private changeUsername() {
    this.updateUsernameSub = this.userService
      .updateUsername(this.username.value)
      .subscribe(
        data => {
          this.helperService.showSnackBar(
            this.helperService.messages.usernameUpdated
          );
        },
        error => {
          this.helperService.showSnackBar(
            this.helperService.messages.tryAgainLater
          );
        }
      );
  }

  private changePassword() {
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.helperService.showSnackBar(
        this.helperService.messages.passwordsNotMatch
      );
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
          this.resetPasswordFormAndShowSnackBar();
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
        this.updateEmailInDatabaseAndResetEmailFormAndShowSnackBar();
      })
      .catch(error => {
        this.catchErrors(error);
      });
  }

  private initUsernameField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
    ];
  }

  private initEmailField(): any {
    return [
      this.user ? this.user.email : null,
      [Validators.required, Validators.email]
    ];
  }

  private initPasswordField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
    ];
  }

  private resetPasswordFormAndShowSnackBar() {
    this.helperService.resetForm(this.passwordForm, this.passwordFormDirective);
    this.helperService.showSnackBar(
      this.helperService.messages.passwordUpdated
    );
  }

  private updateEmailInFirebase(): void | PromiseLike<void> {
    return this.authService.updateEmail(this.email.value);
  }

  private updateEmailInDatabaseAndResetEmailFormAndShowSnackBar() {
    this.updateEmailSub = this.userService
      .updateEmail(this.email.value)
      .pipe(take(1))
      .subscribe(
        response =>
          this.helperService.showSnackBar(
            this.helperService.messages.emailUpdated
          ),
        error =>
          this.helperService.showSnackBar(
            this.helperService.messages.tryAgainLater
          )
      );
    this.helperService.resetForm(this.emailForm, this.emailFormDirective);
  }

  private catchErrors(error: any) {
    if (error.code === 'auth/wrong-password') {
      this.helperService.showSnackBar(
        this.helperService.messages.wrongPassword
      );
    } else {
      this.helperService.showSnackBar(
        this.helperService.messages.tryAgainLater
      );
    }
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
  get username() {
    return this.usernameForm.get('username');
  }
}
