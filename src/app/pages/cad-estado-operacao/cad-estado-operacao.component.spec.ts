import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadEstadoOperacaoComponent } from './cad-estado-operacao.component';

describe('CadEstadoOperacaoComponent', () => {
  let component: CadEstadoOperacaoComponent;
  let fixture: ComponentFixture<CadEstadoOperacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadEstadoOperacaoComponent]
    });
    fixture = TestBed.createComponent(CadEstadoOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
