import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryComponent } from './story.component';
import { SharedTestModule } from 'src/app/shared/shared-test.module';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestModule],
      declarations: [StoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
