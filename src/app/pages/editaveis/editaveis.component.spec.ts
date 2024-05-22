import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaveisComponent } from './editaveis.component';

describe('EditaveisComponent', () => {
  let component: EditaveisComponent;
  let fixture: ComponentFixture<EditaveisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditaveisComponent]
    });
    fixture = TestBed.createComponent(EditaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
