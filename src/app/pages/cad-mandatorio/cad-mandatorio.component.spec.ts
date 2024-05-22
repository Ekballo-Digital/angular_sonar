import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadMandatorioComponent } from './cad-mandatorio.component';

describe('CadMandatorioComponent', () => {
  let component: CadMandatorioComponent;
  let fixture: ComponentFixture<CadMandatorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadMandatorioComponent]
    });
    fixture = TestBed.createComponent(CadMandatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
