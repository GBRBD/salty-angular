import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formDirective') formDirective: FormGroupDirective;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit(form) {
    const user: User = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    console.log(user);
    console.log('valid');
    from(this.authService.signUp(user))
      // .pipe(
      //   map(result => {
      //     return result.user.uid;
      //   })
      //   // switchMap(uid => {
      //   //   user['id'] = uid;
      //   //   return this.userService.saveUser(user);
      //   // })
      // )
      .subscribe(() => console.log('subbed'));
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
