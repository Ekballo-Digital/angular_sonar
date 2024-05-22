import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCoresComponent } from './cad-cores.component';

describe('CadCoresComponent', () => {
  let component: CadCoresComponent;
  let fixture: ComponentFixture<CadCoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadCoresComponent]
    });
    fixture = TestBed.createComponent(CadCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
