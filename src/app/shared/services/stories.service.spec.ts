import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { Story } from '../models/story.model';
import { StoriesService } from './stories.service';
import { SharedTestModule } from '../shared-test.module';

describe('StoriesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let storiesService: StoriesService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedTestModule],
      providers: [StoriesService]
    })
  );

  const testStory = {
    _id: '5c7167898089a63c94681178',
    title: 'Title 1',
    content: 'Content 1'
  };

  const testStories = [
    { title: 'Title 1', content: 'Content 1' },
    { title: 'Title 2', content: 'Content 2' }
  ] as Story[];

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
      storiesService.createStory(testStory).subscribe();
      const req = httpTestingController.expectOne('api/v1/stories/create');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testStory);
    });
  });

  describe('#deleteStory', () => {
    it('should make a DELETE request', () => {
      storiesService.deleteStory(testStory).subscribe();
      const req = httpTestingController.expectOne(
        `api/v1/stories/delete/${testStory._id}`
      );
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('#editStory', () => {
    it('should make a PUT request', () => {
      storiesService.editStory(testStory).subscribe();
      const req = httpTestingController.expectOne('api/v1/stories/edit');
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(testStory);
    });
  });

  describe('#getStory', () => {
    it('should make a GET request', () => {
      const id = '5c7167898089a63c94681178';
      storiesService
        .getStory(id)
        .subscribe(
          story =>
            expect(story).toEqual(testStory, 'should return expected story'),
          fail
        );

      const req = httpTestingController.expectOne(
        'api/v1/stories/5c7167898089a63c94681178'
      );
      expect(req.request.method).toEqual('GET');

      req.flush(testStory);
    });
  });

  describe('#getStories', () => {
    it('should make a GET request', () => {
      storiesService
        .getStories()
        .subscribe(
          stories =>
            expect(stories).toEqual(
              testStories,
              'should return expected stories'
            ),
          fail
        );

      const req = httpTestingController.expectOne('api/v1/stories');
      expect(req.request.method).toEqual('GET');

      req.flush(testStories);
    });
  });
});
