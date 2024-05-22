import { TestBed } from '@angular/core/testing';

import { CorFormService } from './cor-form.service';

describe('CorFormService', () => {
  let service: CorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
