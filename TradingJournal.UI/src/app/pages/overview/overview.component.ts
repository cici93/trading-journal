import { Component, DestroyRef, OnInit } from '@angular/core';
import { TransactionFormComponent } from "../../components/transaction-form/transaction-form.component";
import { BackendService } from "../../services/backend/backend.service";
import { Transaction } from "../../interfaces/transaction.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { resolve } from "@angular/compiler-cli";
import { PositionTableComponent } from "../../components/position-table/position-table.component";
import { NotificationService } from "../../services/notification/notification.service";
import { Position } from "../../interfaces/position.interface";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { PositionFormComponent } from "../../components/position-form/position-form.component";
import { EventTimelineComponent } from "../../components/event-timeline/event-timeline.component";



@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [
        TransactionFormComponent,
        PositionTableComponent,
        NzButtonComponent,
        NzIconDirective,
        PositionFormComponent,
        EventTimelineComponent

    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {

    positions: Position[] = [];

    constructor(
        private backend: BackendService,
        private destroyRef: DestroyRef,
        private notification: NotificationService
    ) {
    }

    log() {
        console.log('transactions', this.positions)
    }

    ngOnInit() {
        this.backend.get<Position[]>('Position').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: res => {
                this.positions = res;
                console.log('allPositions',this.positions)
            },
            error: () =>
                this.notification.showError()
        })
    }

    async deletePosition(positionId: number) {
        this.backend.delete(`Position/${positionId}`)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () =>{
                    this.positions = this.positions.filter(p => p.positionId !== positionId);
                    this.notification.showSuccess();
                },
                error: () => this.notification.showError()
            })
    }
}
