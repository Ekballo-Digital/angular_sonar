import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrioridadeComponent } from './editar-prioridade.component';

describe('EditarPrioridadeComponent', () => {
  let component: EditarPrioridadeComponent;
  let fixture: ComponentFixture<EditarPrioridadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPrioridadeComponent]
    });
    fixture = TestBed.createComponent(EditarPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
