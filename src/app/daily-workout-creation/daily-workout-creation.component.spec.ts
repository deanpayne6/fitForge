import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWorkoutCreationComponent } from './daily-workout-creation.component';

describe('DailyWorkoutCreationComponent', () => {
  let component: DailyWorkoutCreationComponent;
  let fixture: ComponentFixture<DailyWorkoutCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWorkoutCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyWorkoutCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
