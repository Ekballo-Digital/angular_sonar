import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConFuncaoMenuComponent } from './con-funcao-menu.component';

describe('ConFuncaoMenuComponent', () => {
  let component: ConFuncaoMenuComponent;
  let fixture: ComponentFixture<ConFuncaoMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConFuncaoMenuComponent]
    });
    fixture = TestBed.createComponent(ConFuncaoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
