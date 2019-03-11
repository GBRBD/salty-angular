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

  user: User;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  private updateEmailSub: Subscription;
  private updatePasswordSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private helperService: HelperService
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
    this.unsubscribeFromEverything();
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

  private unsubscribeFromEverything() {
    if (this.updateEmailSub) {
      this.updateEmailSub.unsubscribe();
    }
    if (this.updatePasswordSub) {
      this.updatePasswordSub.unsubscribe();
    }
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

  private initEmailField(): any {
    return [this.user.email, [Validators.required, Validators.email]];
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
      .updateUserEmail(this.email.value)
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
}
