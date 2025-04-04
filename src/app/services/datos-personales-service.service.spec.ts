import { TestBed } from '@angular/core/testing';

import { DatosPersonalesServiceService } from './datos-personales-service.service';

describe('DatosPersonalesServiceService', () => {
  let service: DatosPersonalesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPersonalesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
