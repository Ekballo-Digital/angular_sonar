import { TestBed } from '@angular/core/testing';

import { PaineisService } from './paineis.service';

describe('PaineisService', () => {
  let service: PaineisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaineisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
