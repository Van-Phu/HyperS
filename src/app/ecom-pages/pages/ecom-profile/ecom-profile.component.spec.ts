import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomProfileComponent } from './ecom-profile.component';

describe('EcomProfileComponent', () => {
  let component: EcomProfileComponent;
  let fixture: ComponentFixture<EcomProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcomProfileComponent]
    });
    fixture = TestBed.createComponent(EcomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
