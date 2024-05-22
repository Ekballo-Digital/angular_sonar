import { TestBed } from '@angular/core/testing';

import { MiddlewareValidaUrlsService } from './middleware-valida-urls.service';

describe('MiddlewareValidaUrlsService', () => {
  let service: MiddlewareValidaUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddlewareValidaUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
