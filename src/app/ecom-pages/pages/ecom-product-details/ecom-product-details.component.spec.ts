import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomProductDetailsComponent } from './ecom-product-details.component';

describe('EcomProductDetailsComponent', () => {
  let component: EcomProductDetailsComponent;
  let fixture: ComponentFixture<EcomProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcomProductDetailsComponent]
    });
    fixture = TestBed.createComponent(EcomProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
