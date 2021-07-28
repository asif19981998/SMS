import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledetalisComponent } from './saledetalis.component';

describe('SaledetalisComponent', () => {
  let component: SaledetalisComponent;
  let fixture: ComponentFixture<SaledetalisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledetalisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
