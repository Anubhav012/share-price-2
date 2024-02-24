import { TestBed } from '@angular/core/testing';

import { StockDividendService } from './stock-dividend.service';

describe('StockDividendService', () => {
  let service: StockDividendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDividendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
