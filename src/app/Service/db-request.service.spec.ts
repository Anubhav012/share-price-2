import { TestBed } from '@angular/core/testing';

import { DbRequestService } from './db-request.service';

describe('DbRequestService', () => {
  let service: DbRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
