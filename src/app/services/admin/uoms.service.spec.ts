import { TestBed } from '@angular/core/testing';

import { UOMsService } from './uoms.service';

describe('UOMsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UOMsService = TestBed.get(UOMsService);
    expect(service).toBeTruthy();
  });
});
