import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGrupoadComponent } from './editar-grupoad.component';

describe('EditarGrupoadComponent', () => {
  let component: EditarGrupoadComponent;
  let fixture: ComponentFixture<EditarGrupoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGrupoadComponent]
    });
    fixture = TestBed.createComponent(EditarGrupoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
