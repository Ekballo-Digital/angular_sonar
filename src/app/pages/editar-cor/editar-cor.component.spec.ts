import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCorComponent } from './editar-cor.component';

describe('EditarCorComponent', () => {
  let component: EditarCorComponent;
  let fixture: ComponentFixture<EditarCorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCorComponent]
    });
    fixture = TestBed.createComponent(EditarCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
