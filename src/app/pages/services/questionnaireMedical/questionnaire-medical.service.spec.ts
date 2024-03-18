import {TestBed} from '@angular/core/testing';

import {QuestionnaireMedicalService} from './questionnaire-medical.service';

describe('QuestionnaireMedicalService', () => {
    let service: QuestionnaireMedicalService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(QuestionnaireMedicalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
