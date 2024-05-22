import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredComponent } from './cred.component';

describe('CredComponent', () => {
  let component: CredComponent;
  let fixture: ComponentFixture<CredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredComponent]
    });
    fixture = TestBed.createComponent(CredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
