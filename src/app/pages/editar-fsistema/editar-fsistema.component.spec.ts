import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFsistemaComponent } from './editar-fsistema.component';

describe('EditarFsistemaComponent', () => {
  let component: EditarFsistemaComponent;
  let fixture: ComponentFixture<EditarFsistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFsistemaComponent]
    });
    fixture = TestBed.createComponent(EditarFsistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
