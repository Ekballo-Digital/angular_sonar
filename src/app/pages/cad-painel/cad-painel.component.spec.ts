import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPainelComponent } from './cad-painel.component';

describe('CadPainelComponent', () => {
  let component: CadPainelComponent;
  let fixture: ComponentFixture<CadPainelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadPainelComponent]
    });
    fixture = TestBed.createComponent(CadPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
