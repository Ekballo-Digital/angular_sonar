import { TestBed } from '@angular/core/testing';

import { SelectsService } from './selects.service';

describe('SelectsService', () => {
  let service: SelectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
