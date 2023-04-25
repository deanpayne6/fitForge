import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitforgeLogoComponent } from './fitforge-logo.component';

describe('FitforgeLogoComponent', () => {
  let component: FitforgeLogoComponent;
  let fixture: ComponentFixture<FitforgeLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitforgeLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitforgeLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
