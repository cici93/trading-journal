import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsDialogComponent } from './positions-dialog.component';

describe('PositionsDialogComponent', () => {
  let component: PositionsDialogComponent;
  let fixture: ComponentFixture<PositionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PositionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
