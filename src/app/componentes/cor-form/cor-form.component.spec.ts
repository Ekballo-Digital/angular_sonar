import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorFormComponent } from './cor-form.component';

describe('CorFormComponent', () => {
  let component: CorFormComponent;
  let fixture: ComponentFixture<CorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorFormComponent]
    });
    fixture = TestBed.createComponent(CorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
