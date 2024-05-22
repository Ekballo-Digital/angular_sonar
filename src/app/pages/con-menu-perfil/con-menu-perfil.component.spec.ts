import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConMenuPerfilComponent } from './con-menu-perfil.component';

describe('ConMenuPerfilComponent', () => {
  let component: ConMenuPerfilComponent;
  let fixture: ComponentFixture<ConMenuPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConMenuPerfilComponent]
    });
    fixture = TestBed.createComponent(ConMenuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
