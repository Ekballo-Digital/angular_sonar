import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPerfilFormComponent } from './menu-perfil-form.component';

describe('MenuPerfilFormComponent', () => {
  let component: MenuPerfilFormComponent;
  let fixture: ComponentFixture<MenuPerfilFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPerfilFormComponent]
    });
    fixture = TestBed.createComponent(MenuPerfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
