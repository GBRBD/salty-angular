import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    })
  );

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
