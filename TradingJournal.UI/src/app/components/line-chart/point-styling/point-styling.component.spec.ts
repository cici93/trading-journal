import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointStylingComponent } from './point-styling.component';

describe('PointStylingComponent', () => {
  let component: PointStylingComponent;
  let fixture: ComponentFixture<PointStylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointStylingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
