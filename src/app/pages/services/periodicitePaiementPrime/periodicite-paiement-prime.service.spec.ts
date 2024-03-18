import {TestBed} from '@angular/core/testing';

import {PeriodicitePaiementPrimeService} from './periodicite-paiement-prime.service';

describe('PeriodicitePaiementPrimeService', () => {
    let service: PeriodicitePaiementPrimeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PeriodicitePaiementPrimeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
