import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PeriodiciteRemboursementComponent} from './periodicite-remboursement.component';

describe('PeriodiciteRemboursementComponent', () => {
    let component: PeriodiciteRemboursementComponent;
    let fixture: ComponentFixture<PeriodiciteRemboursementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PeriodiciteRemboursementComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeriodiciteRemboursementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
