import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitalLoginPageComponent } from './inital-login-page.component';

describe('InitalLoginPageComponent', () => {
  let component: InitalLoginPageComponent;
  let fixture: ComponentFixture<InitalLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitalLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitalLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
