import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMsgFormComponent } from './enviar-msg-form.component';

describe('EnviarMsgFormComponent', () => {
  let component: EnviarMsgFormComponent;
  let fixture: ComponentFixture<EnviarMsgFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarMsgFormComponent]
    });
    fixture = TestBed.createComponent(EnviarMsgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
