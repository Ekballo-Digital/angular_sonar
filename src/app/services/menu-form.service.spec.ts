import { TestBed } from '@angular/core/testing';

import { MenuFormService } from './menu-form.service';

describe('MenuFormService', () => {
  let service: MenuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
