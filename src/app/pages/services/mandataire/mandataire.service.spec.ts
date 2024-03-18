import {TestBed} from '@angular/core/testing';

import {MandataireService} from './mandataire.service';

describe('MandataireService', () => {
    let service: MandataireService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MandataireService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
