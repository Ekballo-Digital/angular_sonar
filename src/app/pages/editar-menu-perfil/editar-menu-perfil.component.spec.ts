import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMenuPerfilComponent } from './editar-menu-perfil.component';

describe('EditarMenuPerfilComponent', () => {
  let component: EditarMenuPerfilComponent;
  let fixture: ComponentFixture<EditarMenuPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMenuPerfilComponent]
    });
    fixture = TestBed.createComponent(EditarMenuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
