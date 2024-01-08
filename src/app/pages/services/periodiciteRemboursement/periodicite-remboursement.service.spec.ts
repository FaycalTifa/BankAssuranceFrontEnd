import { TestBed } from '@angular/core/testing';

import { PeriodiciteRemboursementService } from './periodicite-remboursement.service';

describe('PeriodiciteRemboursementService', () => {
  let service: PeriodiciteRemboursementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodiciteRemboursementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
