import { TestBed } from '@angular/core/testing';

import { StockLiveDataService } from './stock-live-data.service';

describe('StockLiveDataService', () => {
  let service: StockLiveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockLiveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
