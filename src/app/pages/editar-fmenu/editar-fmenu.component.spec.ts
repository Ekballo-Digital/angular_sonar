import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFmenuComponent } from './editar-fmenu.component';

describe('EditarFmenuComponent', () => {
  let component: EditarFmenuComponent;
  let fixture: ComponentFixture<EditarFmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFmenuComponent]
    });
    fixture = TestBed.createComponent(EditarFmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
