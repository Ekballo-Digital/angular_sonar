import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPainelComponent } from './editar-painel.component';

describe('EditarPainelComponent', () => {
  let component: EditarPainelComponent;
  let fixture: ComponentFixture<EditarPainelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPainelComponent]
    });
    fixture = TestBed.createComponent(EditarPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
