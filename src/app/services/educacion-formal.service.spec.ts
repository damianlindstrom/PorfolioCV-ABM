import { TestBed } from '@angular/core/testing';

import { EducacionFormalService } from './educacion-formal.service';

describe('EducacionFormalService', () => {
  let service: EducacionFormalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducacionFormalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
