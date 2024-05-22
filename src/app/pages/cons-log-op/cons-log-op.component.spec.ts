import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsLogOpComponent } from './cons-log-op.component';

describe('ConsLogOpComponent', () => {
  let component: ConsLogOpComponent;
  let fixture: ComponentFixture<ConsLogOpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsLogOpComponent]
    });
    fixture = TestBed.createComponent(ConsLogOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
