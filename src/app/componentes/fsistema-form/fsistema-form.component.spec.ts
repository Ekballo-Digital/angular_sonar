import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsistemaFormComponent } from './fsistema-form.component';

describe('FsistemaFormComponent', () => {
  let component: FsistemaFormComponent;
  let fixture: ComponentFixture<FsistemaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FsistemaFormComponent]
    });
    fixture = TestBed.createComponent(FsistemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
