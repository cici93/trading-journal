import { Component, DestroyRef, OnInit } from '@angular/core';
import { TransactionFormComponent } from "../../components/transaction-form/transaction-form.component";
import { BackendService } from "../../services/backend/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PositionTableComponent } from "../../components/position-table/position-table.component";
import { NotificationService } from "../../services/notification/notification.service";
import { Position } from "../../interfaces/position.interface";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { PositionFormComponent } from "../../components/position-form/position-form.component";
import { EventTimelineComponent } from "../../components/event-timeline/event-timeline.component";
import { PieChartComponent } from "../../components/pie-chart/pie-chart.component";
import { PositionCardComponent } from "../../components/position-card/position-card.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { ChipButtonComponent } from "../../components/chip-button/chip-button.component";
import { AssetType } from "../../types/asset.type";
import { VerticalDivComponent } from "../../components/vertical-div/vertical-div.component";
import positionsMock from '../../../assets/mocks/positions-mock.json';
import { TransactionType } from "../../types/transaction.type";


@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [
        TransactionFormComponent,
        PositionTableComponent,
        NzButtonComponent,
        NzIconDirective,
        PositionFormComponent,
        EventTimelineComponent,
        PieChartComponent,
        PositionCardComponent,
        PageHeaderComponent,
        ChipButtonComponent,
        VerticalDivComponent,
    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
    selectedView: 'Tile' | 'Table' = 'Tile';


    assetTypes: AssetType[] = ['Stock', 'Bond', 'Crypto', 'Crypto', 'Etf', 'Index', 'Derivative', 'Forex', 'Other'];
    positions: Position[] = [];

    onChipToggle(event: boolean) {
    }

    constructor(
        private backend: BackendService,
        private destroyRef: DestroyRef,
        private notification: NotificationService
    ) {
    }

    ngOnInit() {
        this.positions  = positionsMock.map(position => ({
            ...position,
            transactions: position.transactions.map(transaction => ({
                ...transaction,
                transactionId: transaction.transactionId? transaction.transactionId : 0,
                transactionType: transaction.transactionType as TransactionType,
                transactionDate: new Date(transaction.transactionDate),
            })),
        }));
    }

    changeView(view: 'Tile' | 'Table') {
        this.selectedView = view;
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

    increment() {
        // Get the current date and format it as a string
        const today = new Date().toISOString().split('T')[0];

        // Retrieve the value from localStorage
        let value = localStorage.getItem(today);

        // If the value exists, increment it. If it doesn't exist, initialize it to 1
        let newValue = value ? Number(value) + 1 : 1;

        // Store the new value in localStorage
        localStorage.setItem(today, newValue.toString());
    }

    getIncrementedValue() {
        // Get the current date and format it as a string
        const today = new Date().toISOString().split('T')[0];

        // Retrieve the value from localStorage
        let value = localStorage.getItem(today);

        // If the value exists, return it. If it doesn't exist, return 0
        window.alert(value ? value : 0);
    }
}
