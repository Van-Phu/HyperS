import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomShoesComponent } from './ecom-shoes.component';

describe('EcomShoesComponent', () => {
  let component: EcomShoesComponent;
  let fixture: ComponentFixture<EcomShoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcomShoesComponent]
    });
    fixture = TestBed.createComponent(EcomShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
