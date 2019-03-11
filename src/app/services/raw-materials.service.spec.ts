import { TestBed } from '@angular/core/testing';

import { RawMaterialsService } from './raw-materials.service';

describe('RawMaterialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RawMaterialsService = TestBed.get(RawMaterialsService);
    expect(service).toBeTruthy();
  });
});
