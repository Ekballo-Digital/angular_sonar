import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmenuFormComponent } from './fmenu-form.component';

describe('FmenuFormComponent', () => {
  let component: FmenuFormComponent;
  let fixture: ComponentFixture<FmenuFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FmenuFormComponent]
    });
    fixture = TestBed.createComponent(FmenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
