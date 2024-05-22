import { TestBed } from '@angular/core/testing';

import { AreaFormService } from './area-form.service';

describe('AreaFormService', () => {
  let service: AreaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
