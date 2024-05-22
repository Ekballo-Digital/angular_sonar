import { TestBed } from '@angular/core/testing';

import { FmenuFormService } from './fmenu-form.service';

describe('FmenuFormService', () => {
  let service: FmenuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FmenuFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
