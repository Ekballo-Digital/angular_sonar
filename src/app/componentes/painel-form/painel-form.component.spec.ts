import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFormComponent } from './painel-form.component';

describe('PainelFormComponent', () => {
  let component: PainelFormComponent;
  let fixture: ComponentFixture<PainelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainelFormComponent]
    });
    fixture = TestBed.createComponent(PainelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
