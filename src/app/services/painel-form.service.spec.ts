import { TestBed } from '@angular/core/testing';

import { PainelFormService } from './painel-form.service';

describe('PainelFormService', () => {
  let service: PainelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
