import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRatingComponent } from './workout-rating.component';

describe('WorkoutRatingComponent', () => {
  let component: WorkoutRatingComponent;
  let fixture: ComponentFixture<WorkoutRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
