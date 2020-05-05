import { TestBed } from '@angular/core/testing';

import { TimeUtilsService } from './time-utils.service';

describe('TimeUtilsService', () => {
  let service: TimeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBeginEndTimestampDisplayFormat', () => {
    it('should be in the (beginTime) - (endTime) format', () => {
      const beginTime = "01:00";
      const endTime = "19:30";

      expect(service.getBeginEndTimestampDisplayFormat(beginTime, endTime)).toEqual('01:00 - 19:30');
    });
  });

  describe('getUTCTimeDisplayFormat', () => {
    it('should be converted and displayed in the correct format', () => {
      const milliseconds = 1563753600;

      expect(service.getUTCTimeDisplayFormat(milliseconds)).toEqual('02:22:33');
    });
  });

  describe('addZero', () => {
    it('should add leading 0 if number is less than 10, for consistent two-digit display', () => {

      expect(service.addZero(7)).toEqual('07');
    });
  });

});
