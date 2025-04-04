import { TestBed } from '@angular/core/testing';

import { LenguajesService } from './languajes.service';

describe('LanguajesService', () => {
  let service: LenguajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenguajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
