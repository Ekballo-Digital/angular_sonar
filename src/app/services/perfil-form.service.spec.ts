import { TestBed } from '@angular/core/testing';

import { PerfilFormService } from './perfil-form.service';

describe('PerfilFormService', () => {
  let service: PerfilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
