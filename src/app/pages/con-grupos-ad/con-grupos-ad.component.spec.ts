import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConGruposAdComponent } from './con-grupos-ad.component';

describe('ConGruposAdComponent', () => {
  let component: ConGruposAdComponent;
  let fixture: ComponentFixture<ConGruposAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConGruposAdComponent]
    });
    fixture = TestBed.createComponent(ConGruposAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
