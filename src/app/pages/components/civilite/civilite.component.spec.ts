import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CiviliteComponent} from './civilite.component';

describe('CiviliteComponent', () => {
    let component: CiviliteComponent;
    let fixture: ComponentFixture<CiviliteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CiviliteComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CiviliteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
