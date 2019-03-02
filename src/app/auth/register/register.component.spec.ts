import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelperService } from 'src/app/shared/services/helper.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerElement: HTMLElement;
  let username: AbstractControl;
  let email: AbstractControl;
  let password: AbstractControl;
  let authService: AuthService;
  let helperService: HelperService;
  let errors;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [RegisterComponent],
      providers: [AngularFireAuth, AuthService, HelperService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    helperService = TestBed.get(HelperService);
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
    errors = {};
    registerElement = fixture.nativeElement;
    username = component.registerForm.controls.username;
    email = component.registerForm.controls.email;
    password = component.registerForm.controls.password;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title with 'Register' `, () => {
    const title = registerElement.querySelector('mat-card-title');
    expect(title.textContent).toContain('Register');
  });

  describe('Register Form', () => {
    it('should be invalid when empty', () => {
      expect(component.registerForm.valid).toBeFalsy();
    });

    it(`should have a button with text 'Register'`, () => {
      const submitButton = registerElement.querySelector('button');
      expect(submitButton.textContent).toContain('Register');
    });

    it('Submit button should be disabled when form is invalid', () => {
      const submitButton = registerElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    it('should submit form when form is valid ', () => {
      username.setValue('xxxx');
      email.setValue('xxxx@xxx.com');
      password.setValue('xxxxxxxx');

      spyOn(authService, 'signUp').and.returnValue(Promise.resolve());

      component.onSubmit();
      fixture.detectChanges();
      expect(authService.signUp).toHaveBeenCalled();
    });

    it('should have disabled submit button when form is invalid', () => {
      const submitButton = registerElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    it(`should have a button with text 'register'`, () => {
      const submitButton = registerElement.querySelector('button');
      expect(submitButton.textContent).toContain('Register');
    });

    describe('Username Field', () => {
      it('should create username field with empty string', () => {
        expect(username.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        errors = username.errors;
        expect(errors.required).toBeTruthy();
        expect(username.valid).toBeFalsy();
      });

      // it('should be invalid when input length is less than 4 character', () => {
      //   username.setValue('xx');
      //   expect(username.valid).toBeFalsy();
      // });

      it('should be valid when input length is greater than or equal to 4 character', () => {
        username.setValue('xxxx');
        expect(username.valid).toBeTruthy();
      });

      it('should be invalid when input length is greater than 12 character', () => {
        const longString = helperService.longStringMaker(13);
        username.setValue(longString);
        expect(username.valid).toBeFalsy();
      });

      it('should show error messages when input is empty', () => {
        username.setValue('');
        username.markAsTouched();
        fixture.detectChanges();
        const errorMessage = registerElement.querySelector(
          'mat-error.username'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyUsernameError
        );
      });

      it('should show error messages when input too long', () => {
        const longString = helperService.longStringMaker(13);
        username.setValue(longString);
        username.markAsTouched();
        fixture.detectChanges();
        const errorMessage = registerElement.querySelector(
          'mat-error.username'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongUsernameError
        );
      });
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
        const errorMessage = registerElement.querySelector('mat-error.email');
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
        const errorMessage = registerElement.querySelector(
          'mat-error.password'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyPasswordError
        );
      });

      it('should show error messages when input too long', () => {
        const longString = helperService.longStringMaker(33);
        password.setValue(longString);
        password.markAsTouched();
        fixture.detectChanges();
        const errorMessage = registerElement.querySelector(
          'mat-error.password'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongPasswordError
        );
      });
    });
  });
});
