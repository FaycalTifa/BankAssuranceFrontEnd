import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsCreditComponent} from './details-credit.component';

describe('DetailsCreditComponent', () => {
    let component: DetailsCreditComponent;
    let fixture: ComponentFixture<DetailsCreditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailsCreditComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailsCreditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
