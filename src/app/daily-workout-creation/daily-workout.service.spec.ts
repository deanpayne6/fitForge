import { TestBed } from '@angular/core/testing';

import { DailyWorkoutService } from './daily-workout.service';

describe('DailyWorkoutService', () => {
  let service: DailyWorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyWorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
