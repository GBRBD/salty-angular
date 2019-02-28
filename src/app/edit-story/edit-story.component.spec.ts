import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditStoryComponent } from './edit-story.component';
import { Story } from '../shared/models/story.model';
import { HelperService } from '../shared/services/helper.service';
import { StoriesService } from '../shared/services/stories.service';

describe('EditStoryComponent', () => {
  let component: EditStoryComponent;
  let fixture: ComponentFixture<EditStoryComponent>;
  let helperService: HelperService;
  let storiesServiceSpy: StoriesService;
  let editStoryElement: HTMLElement;
  let title: AbstractControl;
  let content: AbstractControl;
  let errors;
  const testStory: Story = {
    _id: '5c71879806983d1e0c9001b7',
    title: 'test title',
    content: 'test content'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [EditStoryComponent],
      providers: [HelperService, StoriesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoryComponent);
    component = fixture.componentInstance;
    component.story = testStory;
    helperService = TestBed.get(HelperService);
    storiesServiceSpy = TestBed.get(StoriesService);
    fixture.detectChanges();
    editStoryElement = fixture.nativeElement;
    title = component.editForm.controls.title;
    content = component.editForm.controls.content;
    errors = {};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill out form with test title', () => {
    const titleInput: HTMLInputElement = editStoryElement.querySelector(
      'input[formControlName="title"]'
    );
    expect(titleInput.value).toBe(testStory.title);
  });

  it('should fill out form with test content', () => {
    const contentInput: HTMLTextAreaElement = editStoryElement.querySelector(
      'textarea[formControlName="content"]'
    );
    expect(contentInput.value).toBe(testStory.content);
  });

  describe('Edit Form', () => {
    it('should submit form when form is valid ', () => {
      spyOn(storiesServiceSpy, 'editStory').and.returnValue({
        subscribe: () => {}
      });
      component.onSubmit();
      fixture.detectChanges();
      expect(storiesServiceSpy.editStory).toHaveBeenCalled();
    });

    it('should not submit form when form is invalid ', () => {
      spyOn(storiesServiceSpy, 'editStory');
      title.setValue('');
      content.setValue('');
      fixture.detectChanges();
      component.onSubmit();
      expect(storiesServiceSpy.editStory).not.toHaveBeenCalled();
    });

    it('Submit button should be disabled when form is invalid', () => {
      title.setValue('');
      content.setValue('');
      fixture.detectChanges();
      const submitButton = editStoryElement.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
    });

    it(`should have a button with test 'save'`, () => {
      const submitButton = editStoryElement.querySelector('button');
      expect(submitButton.textContent).toContain('Save');
    });

    it(`should have a button with test 'delete'`, () => {
      const deleteButton = editStoryElement.querySelector('.delete');
      expect(deleteButton.textContent).toContain('Delete');
    });

    it('should delete story when clicked ', () => {
      spyOn(storiesServiceSpy, 'deleteStory').and.returnValue({
        subscribe: () => {}
      });
      component.onDelete();
      expect(storiesServiceSpy.deleteStory).toHaveBeenCalled();
    });

    describe('Title Field', () => {
      it('should not create title field with empty string', () => {
        expect(title.value).toBeTruthy();
      });

      it('should be invalid when empty', () => {
        title.setValue('');
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
        const errorMessage = editStoryElement.querySelector('mat-error.title');
        expect(errorMessage.textContent).toContain(
          component.errorMessages.emptyTitleError
        );
      });

      it('should show error messages when title input too long', () => {
        const longString = helperService.longStringMaker(141);
        title.setValue(longString);
        title.markAsTouched();
        fixture.detectChanges();
        const errorMessage = editStoryElement.querySelector('mat-error.title');
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongTitleError
        );
      });
    });

    describe('Content Field', () => {
      it('should not create content field with empty string', () => {
        expect(content.value).toBeTruthy();
      });

      it('should be invalid when empty', () => {
        content.setValue('');
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
        const errorMessage = editStoryElement.querySelector(
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
        const errorMessage = editStoryElement.querySelector(
          'mat-error.content'
        );
        expect(errorMessage.textContent).toContain(
          component.errorMessages.tooLongContentError
        );
      });
    });
  });
});
