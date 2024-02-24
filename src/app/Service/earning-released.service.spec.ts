import { TestBed } from '@angular/core/testing';

import { EarningReleasedService } from './earning-released.service';

describe('EarningReleasedService', () => {
  let service: EarningReleasedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarningReleasedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
