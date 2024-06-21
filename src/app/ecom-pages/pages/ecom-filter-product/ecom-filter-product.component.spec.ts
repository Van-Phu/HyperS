import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomFilterProductComponent } from './ecom-filter-product.component';

describe('EcomFilterProductComponent', () => {
  let component: EcomFilterProductComponent;
  let fixture: ComponentFixture<EcomFilterProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcomFilterProductComponent]
    });
    fixture = TestBed.createComponent(EcomFilterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
