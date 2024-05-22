import { TestBed } from '@angular/core/testing';

import { MiddlewareValidaPainelService } from './middleware-valida-painel.service';

describe('MiddlewareValidaPainelService', () => {
  let service: MiddlewareValidaPainelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddlewareValidaPainelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
