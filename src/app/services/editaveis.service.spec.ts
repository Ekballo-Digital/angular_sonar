import { TestBed } from '@angular/core/testing';

import { EditaveisService } from './editaveis.service';

describe('EditaveisService', () => {
  let service: EditaveisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditaveisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
