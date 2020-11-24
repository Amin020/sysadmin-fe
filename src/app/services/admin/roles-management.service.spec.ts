import { TestBed } from '@angular/core/testing';

import { RolesManagementService } from 'src/app/services/admin/roles-management.service';

describe('RolesManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesManagementService = TestBed.get(RolesManagementService);
    expect(service).toBeTruthy();
  });
});
