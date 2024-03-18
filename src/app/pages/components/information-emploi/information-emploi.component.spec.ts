import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InformationEmploiComponent} from './information-emploi.component';

describe('InformationEmploiComponent', () => {
    let component: InformationEmploiComponent;
    let fixture: ComponentFixture<InformationEmploiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InformationEmploiComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InformationEmploiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
