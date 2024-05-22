import { TestBed } from '@angular/core/testing';

import { MenuPerfilFormService } from './menu-perfil-form.service';

describe('MenuPerfilFormService', () => {
  let service: MenuPerfilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPerfilFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
