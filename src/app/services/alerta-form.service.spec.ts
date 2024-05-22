import { TestBed } from '@angular/core/testing';

import { AlertaFormService } from './alerta-form.service';

describe('AlertaFormService', () => {
  let service: AlertaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
