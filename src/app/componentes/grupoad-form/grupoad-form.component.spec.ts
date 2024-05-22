import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoadFormComponent } from './grupoad-form.component';

describe('GrupoadFormComponent', () => {
  let component: GrupoadFormComponent;
  let fixture: ComponentFixture<GrupoadFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoadFormComponent]
    });
    fixture = TestBed.createComponent(GrupoadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
