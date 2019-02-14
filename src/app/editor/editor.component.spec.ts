import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractControl } from '@angular/forms';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let title: AbstractControl;
  let content: AbstractControl;
  let editorElement: HTMLElement;
  let errors;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [EditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    editorElement = fixture.nativeElement;
    errors = {};
    title = component.storyForm.controls.title;
    content = component.storyForm.controls.content;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Story Form', () => {
    it('should be invalid when empty', () => {
      expect(component.storyForm.valid).toBeFalsy();
    });

    it('should be defined after Angular calls ngOnInit', () => {
      expect(component.storyForm).toBeDefined();
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
        const longString = longStringMaker(141);
        title.setValue(longString);
        expect(title.valid).toBeFalsy();
      });

      it('should show error messages when title input is empty', () => {
        title.setValue('');
        title.markAsTouched();
        fixture.detectChanges();
        const errorMessage = editorElement.querySelector('mat-error.title');
        expect(errorMessage.textContent).toBe(component.emptyTitleError);
      });

      it('should show error messages when title input too long', () => {
        const longString = longStringMaker(141);
        title.setValue(longString);
        title.markAsTouched();
        fixture.detectChanges();
        const errorMessage = editorElement.querySelector('mat-error.title');
        expect(errorMessage.textContent).toBe(component.tooLongTitleError);
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
        const longString = longStringMaker(10001);
        content.setValue(longString);
        expect(content.valid).toBeFalsy();
      });

      it('should show error messages when content input is empty', () => {
        content.setValue('');
        content.markAsTouched();
        fixture.detectChanges();
        const errorMessage = editorElement.querySelector('mat-error.content');
        expect(errorMessage.textContent).toBe(component.emptyContentError);
      });

      it('should show error messages when content input is too long', () => {
        const longString = longStringMaker(10001);
        content.setValue(longString);
        content.markAsTouched();
        fixture.detectChanges();
        const errorMessage = editorElement.querySelector('mat-error.content');
        expect(errorMessage.textContent).toBe(component.tooLongContentError);
      });
    });
  });
});

function longStringMaker(numberOfRepeats: number): string {
  return 'x'.repeat(numberOfRepeats);
}
