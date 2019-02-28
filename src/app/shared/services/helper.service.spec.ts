import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [HelperService] })
  );

  beforeEach(() => {
    service = TestBed.get(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#longStringMaker', () => {
    it('should create 3 length string if parameter is 3', () => {
      const testString = service.longStringMaker(3);
      expect(testString.length).toBe(3);
    });
    it('should throw error if parameter is negative', () => {
      expect(() => {
        service.longStringMaker(-30);
      }).toThrow();
    });
  });
});
