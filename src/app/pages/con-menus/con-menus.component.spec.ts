import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConMenusComponent } from './con-menus.component';

describe('ConMenusComponent', () => {
  let component: ConMenusComponent;
  let fixture: ComponentFixture<ConMenusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConMenusComponent]
    });
    fixture = TestBed.createComponent(ConMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
