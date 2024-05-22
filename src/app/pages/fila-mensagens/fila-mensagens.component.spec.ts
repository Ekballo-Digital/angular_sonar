import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaMensagensComponent } from './fila-mensagens.component';

describe('FilaMensagensComponent', () => {
  let component: FilaMensagensComponent;
  let fixture: ComponentFixture<FilaMensagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilaMensagensComponent]
    });
    fixture = TestBed.createComponent(FilaMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
