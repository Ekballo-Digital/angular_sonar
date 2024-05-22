import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsMatrizFormComponent } from './cons-matriz-form.component';

describe('ConsMatrizFormComponent', () => {
  let component: ConsMatrizFormComponent;
  let fixture: ComponentFixture<ConsMatrizFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsMatrizFormComponent]
    });
    fixture = TestBed.createComponent(ConsMatrizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
