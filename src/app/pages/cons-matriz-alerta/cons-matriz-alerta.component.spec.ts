import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsMatrizAlertaComponent } from './cons-matriz-alerta.component';

describe('ConsMatrizAlertaComponent', () => {
  let component: ConsMatrizAlertaComponent;
  let fixture: ComponentFixture<ConsMatrizAlertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsMatrizAlertaComponent]
    });
    fixture = TestBed.createComponent(ConsMatrizAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
