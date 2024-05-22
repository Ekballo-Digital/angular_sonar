import { TestBed } from '@angular/core/testing';

import { EnviarMsgServiceService } from './enviar-msg-service.service';

describe('EnviarMsgServiceService', () => {
  let service: EnviarMsgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarMsgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
