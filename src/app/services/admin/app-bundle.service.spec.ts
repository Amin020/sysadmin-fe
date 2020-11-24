import { TestBed } from '@angular/core/testing';

import { AppBundleService } from './app-bundle.service';

describe('AppBundleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppBundleService = TestBed.get(AppBundleService);
    expect(service).toBeTruthy();
  });
});
