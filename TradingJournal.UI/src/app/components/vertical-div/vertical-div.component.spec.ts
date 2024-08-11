import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalDivComponent } from './vertical-div.component';

describe('VerticalDivComponent', () => {
  let component: VerticalDivComponent;
  let fixture: ComponentFixture<VerticalDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
