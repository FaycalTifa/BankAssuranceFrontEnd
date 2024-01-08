import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicitePaiementPrimeComponent } from './periodicite-paiement-prime.component';

describe('PeriodicitePaiementPrimeComponent', () => {
  let component: PeriodicitePaiementPrimeComponent;
  let fixture: ComponentFixture<PeriodicitePaiementPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicitePaiementPrimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicitePaiementPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
