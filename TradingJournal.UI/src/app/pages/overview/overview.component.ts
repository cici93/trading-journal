import { Component, DestroyRef, OnInit } from '@angular/core';
import { TransactionFormComponent } from "../../components/transaction-form/transaction-form.component";
import { BackendService } from "../../services/backend/backend.service";
import { TransactionDto } from "../../interfaces/transaction.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { resolve } from "@angular/compiler-cli";
import { PositionTableComponent } from "../../components/position-table/position-table.component";
import { NotificationService } from "../../services/notification/notification.service";


@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [
        TransactionFormComponent,
        PositionTableComponent

    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {

    transactions: TransactionDto[] = [];

    constructor(
        private backendService: BackendService,
        private destroyRef: DestroyRef,
        private notification: NotificationService) {
    }


    ngOnInit() {
        this.backendService.get<TransactionDto[]>('Transaction').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: res => {
                this.transactions = res;
                console.log(this.transactions)
            },


            error: err =>
                this.notification.showError()
        })
    }
}
