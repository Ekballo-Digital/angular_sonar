import { TestBed } from '@angular/core/testing';

import { EstadoFormService } from './estado-form.service';

describe('EstadoFormService', () => {
  let service: EstadoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
