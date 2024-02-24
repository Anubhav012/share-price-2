import { TestBed } from '@angular/core/testing';

import { BseApiFetchService } from './bse-api-fetch.service';

describe('BseApiFetchService', () => {
  let service: BseApiFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BseApiFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
