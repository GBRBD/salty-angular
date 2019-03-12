import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  messages = {
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
    passwordUpdated: 'Your password has been updated successfully‏!',
    usernameUpdated: 'Your username has been updated successfully‏!',
    tooLongComment: 'Comment is too long! Max 140 character!',
    emptyComment: 'Please write a comment!',
    commentAdded: 'Your username has been added successfully‏!'
  };

  constructor(private snackBar: MatSnackBar) {}

  longStringMaker(numberOfRepeats: number): string {
    if (0 < numberOfRepeats) {
      let longString = '';
      for (let i = 0; i < numberOfRepeats; i++) {
        longString += 'x';
      }
      return longString;
      // return 'x'.repeat(numberOfRepeats);
    } else {
      throw new Error(`Parameter can't be negative`);
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000
    });
  }

  resetForm(formGroup: FormGroup, formGroupDirective: FormGroupDirective) {
    formGroup.reset();
    formGroupDirective.resetForm();
  }
}
