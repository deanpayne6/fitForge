import { TestBed } from '@angular/core/testing';

import { StartDailyService } from './start-daily.service';

describe('StartDailyService', () => {
  let service: StartDailyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartDailyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
