import { TestBed } from '@angular/core/testing';

import { PrioridadeFormService } from './prioridade-form.service';

describe('PrioridadeFormService', () => {
  let service: PrioridadeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioridadeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
