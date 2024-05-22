import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadLocaisComponent } from './cad-locais.component';

describe('CadLocaisComponent', () => {
  let component: CadLocaisComponent;
  let fixture: ComponentFixture<CadLocaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadLocaisComponent]
    });
    fixture = TestBed.createComponent(CadLocaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
