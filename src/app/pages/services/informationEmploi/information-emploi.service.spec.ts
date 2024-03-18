import {TestBed} from '@angular/core/testing';

import {InformationEmploiService} from './information-emploi.service';

describe('InformationEmploiService', () => {
    let service: InformationEmploiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InformationEmploiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
