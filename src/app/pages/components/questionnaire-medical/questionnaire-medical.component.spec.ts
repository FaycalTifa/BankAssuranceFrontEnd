import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionnaireMedicalComponent} from './questionnaire-medical.component';

describe('QuestionnaireMedicalComponent', () => {
    let component: QuestionnaireMedicalComponent;
    let fixture: ComponentFixture<QuestionnaireMedicalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuestionnaireMedicalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireMedicalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
