import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Story } from '../models/story.model';
import { Router } from '@angular/router';

describe('StoriesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let storiesService: StoriesService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [StoriesService, { provide: Router, useValue: router }]
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
    it('should have made a POST request', () => {
      const story: Story = { title: 'Test Title', content: 'Test Content' };
      storiesService.addStory(story);

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/story'
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(story);
    });
  });
});
