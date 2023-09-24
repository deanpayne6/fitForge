import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCreatePageComponent } from './workout-create-page.component';

describe('WorkoutCreatePageComponent', () => {
  let component: WorkoutCreatePageComponent;
  let fixture: ComponentFixture<WorkoutCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
