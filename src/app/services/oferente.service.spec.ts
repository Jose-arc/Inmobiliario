import { TestBed } from '@angular/core/testing';

import { OferenteService } from './oferente.service';

describe('OferenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OferenteService = TestBed.get(OferenteService);
    expect(service).toBeTruthy();
  });
});
