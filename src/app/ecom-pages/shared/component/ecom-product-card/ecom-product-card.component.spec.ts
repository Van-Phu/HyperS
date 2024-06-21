import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomProductCardComponent } from './ecom-product-card.component';

describe('EcomProductCardComponent', () => {
  let component: EcomProductCardComponent;
  let fixture: ComponentFixture<EcomProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcomProductCardComponent]
    });
    fixture = TestBed.createComponent(EcomProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
