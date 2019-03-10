import { AbstractControl } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { environment } from 'src/environments/environment';
import { SharedTestModule } from 'src/app/shared/shared-test.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginElement: HTMLElement;
  let email: AbstractControl;
  let password: AbstractControl;
  let authService: AuthService;
  let helperService: HelperService;
  let errors;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedTestModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [LoginComponent],
      providers: [AngularFireAuth, AuthService, HelperService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    helperService = TestBed.get(HelperService);
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
    errors = {};
    loginElement = fixture.nativeElement;
    email = component.loginForm.controls.email;
    password = component.loginForm.controls.password;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title with 'Login'`, () => {
    const title = loginElement.querySelector('mat-card-title');
    expect(title.textContent).toContain('Login');
  });

  describe('Login Form', () => {
    it('should be invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it(`should have a button with text 'login'`, () => {
      const submitButton = loginElement.querySelector('button');
      expect(submitButton.textContent).toContain('Login');
    });

    it('Submit button should be disabled when form is invalid', () => {
      const submitButton = loginElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    it('should submit form when form is valid ', () => {
      email.setValue('xxxx@xxx.com');
      password.setValue('xxxxxxxx');

      spyOn(authService, 'signIn').and.returnValue(Promise.resolve());

      component.onSubmit();
      fixture.detectChanges();
      expect(authService.signIn).toHaveBeenCalled();
    });

    it(`should have a button with text 'login'`, () => {
      const submitButton = loginElement.querySelector('button');
      expect(submitButton.textContent).toContain('Login');
    });

    it('should have a disabled submit button when form is invalid', () => {
      const submitButton = loginElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    describe('Email Field', () => {
      it('should create email field with empty string', () => {
        expect(email.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        errors = email.errors;
        expect(errors.required).toBeTruthy();
        expect(email.valid).toBeFalsy();
      });

      it('should show error messages when input is empty', () => {
        email.setValue('');
        email.markAsTouched();
        fixture.detectChanges();
        const errorMessage = loginElement.querySelector('mat-error.email');
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyEmailError
        );
      });
    });

    describe('Password Field', () => {
      it('should create password field with empty string', () => {
        expect(password.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        errors = password.errors;
        expect(errors.required).toBeTruthy();
        expect(password.valid).toBeFalsy();
      });

      it('should be invalid when input length is less than 6 character', () => {
        password.setValue('xx');
        expect(password.valid).toBeFalsy();
      });

      it('should be valid when input length is greater than or equal to 6 character', () => {
        password.setValue('xxxxxx');
        expect(password.valid).toBeTruthy();
      });

      it('should be invalid when input length is greater than 32 character', () => {
        const longString = helperService.longStringMaker(33);
        password.setValue(longString);
        expect(password.valid).toBeFalsy();
      });

      it('should show error messages when input is empty', () => {
        password.setValue('');
        password.markAsTouched();
        fixture.detectChanges();
        const errorMessage = loginElement.querySelector('mat-error.password');
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyPasswordError
        );
      });

      it('should show error messages when input too long', () => {
        const longString = helperService.longStringMaker(33);
        password.setValue(longString);
        password.markAsTouched();
        fixture.detectChanges();
        const errorMessage = loginElement.querySelector('mat-error.password');
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongPasswordError
        );
      });
    });
  });
});
