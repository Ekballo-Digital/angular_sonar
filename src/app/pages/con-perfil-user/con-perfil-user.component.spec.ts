import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConPerfilUserComponent } from './con-perfil-user.component';

describe('ConPerfilUserComponent', () => {
  let component: ConPerfilUserComponent;
  let fixture: ComponentFixture<ConPerfilUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConPerfilUserComponent]
    });
    fixture = TestBed.createComponent(ConPerfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
