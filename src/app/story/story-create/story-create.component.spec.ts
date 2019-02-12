import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCreateComponent } from './story-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbstractControl } from '@angular/forms';

describe('StoryCreateComponent', () => {
  let component: StoryCreateComponent;
  let fixture: ComponentFixture<StoryCreateComponent>;
  let title: AbstractControl;
  let content: AbstractControl;
  let errors;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [StoryCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errors = {};
    title = component.createStoryForm.controls.title;
    content = component.createStoryForm.controls.content;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Create Story Form', () => {
    it('form invalid when empty', () => {
      expect(component.createStoryForm.valid).toBeFalsy();
    });

    it('should be defined after Angular calls ngOnInit', () => {
      expect(component.createStoryForm).toBeDefined();
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

      it('should be invalid when value less than 3 character', () => {
        title.setValue('Te');
        expect(title.valid).toBeFalsy();
      });

      it('should be valid when value greater than or equal to 3 character', () => {
        title.setValue('Tes');
        expect(title.valid).toBeTruthy();
      });

      it('should be invalid when value greater than 140 character', () => {
        const longString = longStringMaker(141);
        title.setValue(longString);
        expect(title.valid).toBeFalsy();
      });
    });

    describe('Content Field', () => {
      it('create content field with empty string', () => {
        expect(content.value).toBeFalsy();
      });

      it('should be invalid when empty', () => {
        expect(content.valid).toBeFalsy();
      });

      it('should be invalid when value less than 3 character', () => {
        content.setValue('Te');
        expect(content.valid).toBeFalsy();
      });

      it('should be valid when value greater than or equal to 3 character', () => {
        content.setValue('Tes');
        expect(content.valid).toBeTruthy();
      });

      it('should be invalid when value greater than 10001 character', () => {
        const longString = longStringMaker(10001);
        content.setValue(longString);
        expect(content.valid).toBeFalsy();
      });
    });
  });
});

function longStringMaker(x: number): string {
  let longString = '';
  for (let i = 0; i < x; i++) {
    longString += 'a';
  }
  return longString;
}
