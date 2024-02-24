import { TestBed } from '@angular/core/testing';

import { DividentEarningSharedService } from './divident-earning-shared.service';

describe('DividentEarningSharedService', () => {
  let service: DividentEarningSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividentEarningSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
