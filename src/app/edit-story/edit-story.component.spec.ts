import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditStoryComponent } from './edit-story.component';
import { Story } from '../shared/models/story.model';

describe('EditStoryComponent', () => {
  let component: EditStoryComponent;
  let fixture: ComponentFixture<EditStoryComponent>;
  const testStory: Story = {
    _id: '5c71879806983d1e0c9001b7',
    title: 'test title',
    content: 'test content'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [EditStoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoryComponent);
    component = fixture.componentInstance;
    component.story = testStory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
