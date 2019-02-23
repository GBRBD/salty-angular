import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoryListComponent } from './story-list.component';
import { StoriesService } from 'src/app/shared/services/stories.service';
import { Story } from 'src/app/shared/models/story.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storyListElement: HTMLElement;
  let testStory: Story[];
  let getStoriesSpy: jasmine.Spy;

  beforeEach(async(() => {
    testStory = [{ title: 'Test Title', content: 'Test Content' }];

    // Create a fake TwainService object with a `getQuote()` spy
    const storiesService = jasmine.createSpyObj('StoriesService', [
      'getStories'
    ]);
    // Make the spy return a synchronous Observable with the test data
    getStoriesSpy = storiesService.getStories.and.returnValue(of(testStory));

    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [StoryListComponent],
      providers: [{ provide: StoriesService, useValue: storiesService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storyListElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show story title in mat-card-title', () => {
    const matCardTitle = storyListElement.querySelector('mat-card-title');
    expect(matCardTitle.textContent).toContain(testStory[0].title);
  });
  it('should show story content in mat-card-content', () => {
    const matCardContent = storyListElement.querySelector('mat-card-content');
    expect(matCardContent.textContent).toContain(testStory[0].content);
  });
});
