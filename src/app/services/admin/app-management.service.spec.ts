import { TestBed } from '@angular/core/testing';

import { AppManagementService } from './app-management.service';

describe('AppManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppManagementService = TestBed.get(AppManagementService);
    expect(service).toBeTruthy();
  });
});
