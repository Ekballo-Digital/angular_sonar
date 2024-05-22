import { TestBed } from '@angular/core/testing';

import { ServiceFilaService } from './service-fila.service';

describe('ServiceFilaService', () => {
  let service: ServiceFilaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFilaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
