import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaFormComponent } from './alerta-form.component';

describe('AlertaFormComponent', () => {
  let component: AlertaFormComponent;
  let fixture: ComponentFixture<AlertaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertaFormComponent]
    });
    fixture = TestBed.createComponent(AlertaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
