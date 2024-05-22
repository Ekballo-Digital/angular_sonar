import { TestBed } from '@angular/core/testing';

import { GrupoadFormService } from './grupoad-form.service';

describe('GrupoadFormService', () => {
  let service: GrupoadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoadFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
