import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CreateStoryComponent } from './create-story.component';
import { StoriesService } from '../shared/services/stories.service';
import { HelperService } from '../shared/services/helper.service';

describe('CreateStoryComponent', () => {
  let component: CreateStoryComponent;
  let fixture: ComponentFixture<CreateStoryComponent>;
  let title: AbstractControl;
  let content: AbstractControl;
  let createStoryElement: HTMLElement;
  let storiesService: StoriesService;
  let helperService: HelperService;
  let errors;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CreateStoryComponent],

      providers: [
        StoriesService,
        HelperService
        // { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoryComponent);
    component = fixture.componentInstance;
    storiesService = TestBed.get(StoriesService);
    helperService = TestBed.get(HelperService);
    fixture.detectChanges();
    createStoryElement = fixture.nativeElement;
    errors = {};
    title = component.createForm.controls.title;
    content = component.createForm.controls.content;
  });

  afterEach(() => {
    component.createForm.reset();
    component.formDirective.resetForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Story Form', () => {
    it('should be invalid when empty', () => {
      expect(component.createForm.valid).toBeFalsy();
    });

    it('should be defined after Angular calls ngOnInit', () => {
      expect(component.createForm).toBeDefined();
    });

    it('should submit form when form is valid ', () => {
      title.setValue('xxx');
      content.setValue('xxxx');
      spyOn(storiesService, 'createStory').and.returnValue({
        subscribe: () => {}
      });
      component.onSubmit();
      fixture.detectChanges();
      expect(storiesService.createStory).toHaveBeenCalled();
    });

    it('should not submit form when form is invalid ', () => {
      spyOn(storiesService, 'createStory');
      component.onSubmit();
      fixture.detectChanges();
      expect(storiesService.createStory).not.toHaveBeenCalled();
    });

    it(`should have a button with text 'edit'`, () => {
      const submitButton = createStoryElement.querySelector('button');
      expect(submitButton.textContent).toContain('Create');
    });

    it('Submit button should be disabled when form is invalid', () => {
      const submitButton = createStoryElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    describe('Title Field', () => {
      it('should create title field with empty string', () => {
        expect(title.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        errors = title.errors;
        expect(errors.required).toBeTruthy();
        expect(title.valid).toBeFalsy();
      });

      it('should be invalid when input length is less than 3 character', () => {
        title.setValue('xx');
        expect(title.valid).toBeFalsy();
      });

      it('should be valid when input length is greater than or equal to 3 character', () => {
        title.setValue('xxx');
        expect(title.valid).toBeTruthy();
      });

      it('should be invalid when input length is greater than 140 character', () => {
        const longString = helperService.longStringMaker(141);
        title.setValue(longString);
        expect(title.valid).toBeFalsy();
      });

      it('should show error messages when title input is empty', () => {
        title.setValue('');
        title.markAsTouched();
        fixture.detectChanges();
        const errorMessage = createStoryElement.querySelector(
          'mat-error.title'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyTitleError
        );
      });

      it('should show error messages when title input too long', () => {
        const longString = helperService.longStringMaker(141);
        title.setValue(longString);
        title.markAsTouched();
        fixture.detectChanges();
        const errorMessage = createStoryElement.querySelector(
          'mat-error.title'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongTitleError
        );
      });
    });

    describe('Content Field', () => {
      it('should create content field with empty string', () => {
        expect(content.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        expect(content.valid).toBeFalsy();
      });

      it('should be invalid when input length is less than 3 character', () => {
        content.setValue('xx');
        expect(content.valid).toBeFalsy();
      });

      it('should be valid when input length is greater than or equal to 3 character', () => {
        content.setValue('xxx');
        expect(content.valid).toBeTruthy();
      });

      it('should be invalid when input length is greater than 10000 character', () => {
        const longString = helperService.longStringMaker(10001);
        content.setValue(longString);
        expect(content.valid).toBeFalsy();
      });

      it('should show error messages when content input is empty', () => {
        content.setValue('');
        content.markAsTouched();
        fixture.detectChanges();
        const errorMessage = createStoryElement.querySelector(
          'mat-error.content'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyContentError
        );
      });

      it('should show error messages when content input is too long', () => {
        const longString = helperService.longStringMaker(10001);
        content.setValue(longString);
        content.markAsTouched();
        fixture.detectChanges();
        const errorMessage = createStoryElement.querySelector(
          'mat-error.content'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongContentError
        );
      });
    });
  });
});
