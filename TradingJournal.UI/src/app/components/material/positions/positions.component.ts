import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Position} from "../../../types/position.type";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PositionsDialogComponent} from "./positions-dialog/positions-dialog.component";

@Component({
  selector: 'app-positions',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    CommonModule,
    MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
})
export class PositionsComponent implements OnChanges {
  @Input() positions: Position[] = [];
  columnsToDisplay = ['symbol', 'name', 'price', 'quantity', 'total'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Position | null;
  dataSource = new MatTableDataSource<Position>([]);

  constructor(
      public dialogRef: MatDialog, private viewContainerRef: ViewContainerRef
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['positions']) {
      this.updateDataSource();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateDataSource() {
    if (this.positions.length > 0) {
      this.positions.forEach(pos => {
        let quantity = 0;
        pos.transactions?.forEach(transaction => quantity = quantity + transaction.quantity);
        pos.total = Number((quantity * pos.price!).toFixed(2));
        pos.quantity = quantity;
      })
      this.dataSource.data = this.positions;
    }
  }

  add() {
    this.dialogRef.open(PositionsDialogComponent, { viewContainerRef: this.viewContainerRef});
  }
}
