import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionProdComponent } from './souscription-prod.component';

describe('SouscriptionProdComponent', () => {
  let component: SouscriptionProdComponent;
  let fixture: ComponentFixture<SouscriptionProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscriptionProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouscriptionProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
