import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadAlertasComponent } from './cad-alertas.component';

describe('CadAlertasComponent', () => {
  let component: CadAlertasComponent;
  let fixture: ComponentFixture<CadAlertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadAlertasComponent]
    });
    fixture = TestBed.createComponent(CadAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
