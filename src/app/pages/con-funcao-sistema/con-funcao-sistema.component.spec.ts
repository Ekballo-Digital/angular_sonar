import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConFuncaoSistemaComponent } from './con-funcao-sistema.component';

describe('ConFuncaoSistemaComponent', () => {
  let component: ConFuncaoSistemaComponent;
  let fixture: ComponentFixture<ConFuncaoSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConFuncaoSistemaComponent]
    });
    fixture = TestBed.createComponent(ConFuncaoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
