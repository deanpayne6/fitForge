import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLogComponent } from './workout-log.component';

describe('WorkoutLogComponent', () => {
  let component: WorkoutLogComponent;
  let fixture: ComponentFixture<WorkoutLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
