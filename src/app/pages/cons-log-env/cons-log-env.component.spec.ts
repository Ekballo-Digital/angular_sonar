import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsLogEnvComponent } from './cons-log-env.component';

describe('ConsLogEnvComponent', () => {
  let component: ConsLogEnvComponent;
  let fixture: ComponentFixture<ConsLogEnvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsLogEnvComponent]
    });
    fixture = TestBed.createComponent(ConsLogEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
