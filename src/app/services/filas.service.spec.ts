import { TestBed } from '@angular/core/testing';

import { FilasService } from './filas.service';

describe('FilasService', () => {
  let service: FilasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
