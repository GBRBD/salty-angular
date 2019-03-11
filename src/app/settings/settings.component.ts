import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('emailFormDirective') emailFormDirective: FormGroupDirective;
  @ViewChild('passwordFormDirective') passwordFormDirective: FormGroupDirective;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  errorMessages = {
    emptyUsernameError: 'Please enter a username!',
    tooLongUsernameError: 'Username is too long! Max 12 character!',
    emptyEmailError: 'Please enter an E-mail address!',
    emptyPasswordError: 'Please enter a password!',
    tooLongPasswordError: 'Password is too long! Max 32 characters!'
  };
  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    this.initializeEmailForm();
    this.initializePasswordForm();
  }

  onEmailChangeSubmit() {
    console.log('pina');
  }
  onPasswordChangeSubmit() {
    console.log('pina');
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
