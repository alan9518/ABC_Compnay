import { TestBed } from '@angular/core/testing';

import { ComposedMaterialsService } from './composed-materials.service';

describe('ComposedMaterialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComposedMaterialsService = TestBed.get(ComposedMaterialsService);
    expect(service).toBeTruthy();
  });
});
