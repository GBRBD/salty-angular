import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
  );

  it('should be created', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    expect(service).toBeTruthy();
  });
});
