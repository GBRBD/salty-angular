import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Story } from '../models/story.model';

describe('StoriesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let storiesService: StoriesService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoriesService]
    })
  );

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    storiesService = TestBed.get(StoriesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(storiesService).toBeTruthy();
  });

  describe('#addStory', () => {
    it('should make a POST request', () => {
      const story: Story = { title: 'Test Title', content: 'Test Content' };
      storiesService.addStory(story).subscribe();
      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/stories/add'
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(story);
    });
  });

  describe('#getStories', () => {
    let expectedStories: Story[];

    beforeEach(() => {
      storiesService = TestBed.get(StoriesService);

      expectedStories = [
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' }
      ] as Story[];
    });

    it('should make a GET request', () => {
      storiesService
        .getStories()
        .subscribe(
          stories =>
            expect(stories).toEqual(
              expectedStories,
              'should return expected stories'
            ),
          fail
        );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/stories'
      );
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedStories);
    });
  });
});
