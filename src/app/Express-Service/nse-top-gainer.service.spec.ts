import { TestBed } from '@angular/core/testing';

import { NSETopGainerService } from './nse-top-gainer.service';

describe('NSETopGainerService', () => {
  let service: NSETopGainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NSETopGainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
