import { Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Position } from "../../interfaces/position.interface";
import { DatePipe } from "@angular/common";
import { NzCardComponent, NzCardGridDirective } from "ng-zorro-antd/card";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { ConfirmationService } from "../../services/confirmation/confirmation.service";
import { BackendService } from "../../services/backend/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationService } from "../../services/notification/notification.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-position-table',
  standalone: true,
  imports: [
    NzTableModule,
    TranslateModule,
    DatePipe,
    NzCardComponent,
    NzCardGridDirective,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './position-table.component.html',
  styleUrl: './position-table.component.scss'
})
export class PositionTableComponent {

  @Input() transactions: Position[] = [];
  @Output() deleteOutput: EventEmitter<number> = new EventEmitter<number>();

  expandSet = new Set<number>();

  constructor(
      private confirmation: ConfirmationService,
      private router: Router
  ) {
  }


  async onDeletePosition(positionId: number) {
    const doDelete = await this.confirmation.showConfirm();

    if (doDelete) {
      this.deleteOutput.emit(positionId);
    }
  }

  async onEditPosition(positionId: number) {
    await this.router.navigate(['position', positionId]);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
