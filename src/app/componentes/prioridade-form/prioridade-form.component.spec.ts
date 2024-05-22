import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioridadeFormComponent } from './prioridade-form.component';

describe('PrioridadeFormComponent', () => {
  let component: PrioridadeFormComponent;
  let fixture: ComponentFixture<PrioridadeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrioridadeFormComponent]
    });
    fixture = TestBed.createComponent(PrioridadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
