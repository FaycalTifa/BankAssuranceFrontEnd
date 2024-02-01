import { TestBed } from '@angular/core/testing';

import { DetailsCreditService } from './details-credit.service';

describe('DetailsCreditService', () => {
  let service: DetailsCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
