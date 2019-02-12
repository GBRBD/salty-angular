import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StoryCreateComponent } from './story-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { detectChanges } from '@angular/core/src/render3';

describe('StoryCreateComponent', () => {
  let component: StoryCreateComponent;
  let fixture: ComponentFixture<StoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [StoryCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be undefined after construction', () => {
    expect(component.createStoryForm).toBeUndefined();
  });

  it('form should be defined after Angular calls ngOnInit', () => {
    fixture.detectChanges();
    expect(component.createStoryForm).toBeDefined();
  });

  it('should create title field with empty string', () => {
    fixture.detectChanges();
    expect(component.createStoryForm.get('title').value).toBeFalsy();
  });

  it('should create content field with empty string', () => {
    fixture.detectChanges();
    expect(component.createStoryForm.get('content').value).toBeFalsy();
  });
});
