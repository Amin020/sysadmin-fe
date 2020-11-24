import { TestBed } from '@angular/core/testing';

import { RegiondescService } from 'src/app/services/admin/regiondesc.service';

describe('RegiondescService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegiondescService = TestBed.get(RegiondescService);
    expect(service).toBeTruthy();
  });
});
