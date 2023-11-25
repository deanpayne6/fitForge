import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDailyWorkoutComponent } from './start-daily-workout.component';

describe('StartDailyWorkoutComponent', () => {
  let component: StartDailyWorkoutComponent;
  let fixture: ComponentFixture<StartDailyWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDailyWorkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartDailyWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
