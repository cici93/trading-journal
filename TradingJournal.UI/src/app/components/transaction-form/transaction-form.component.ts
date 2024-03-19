import { Component, DestroyRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzAutosizeDirective, NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { AssetTypesConstant } from "../../constants/assetTypesConstant";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NzCheckboxComponent } from "ng-zorro-antd/checkbox";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { CurrenciesConstant } from "../../constants/currencies.constant";
import { KeyValuePipe } from "@angular/common";
import { NzRadioComponent, NzRadioGroupComponent } from "ng-zorro-antd/radio";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { BackendService } from "../../services/backend/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TransactionDto } from "../../interfaces/transaction.interface";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { NotificationService } from "../../services/notification/notification.service";


@Component({
    selector: 'app-transaction-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzColDirective, NzInputDirective, NzSelectComponent, NzOptionComponent, TranslateModule, NzCheckboxComponent, NzInputNumberComponent, NzDatePickerComponent, KeyValuePipe, NzAutosizeDirective, NzRadioGroupComponent, NzRadioComponent, NzInputGroupComponent, NzButtonComponent],
    templateUrl: './transaction-form.component.html',
    styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit {
    transactionForm: FormGroup = this.formBuilder.group({
        transactionType: ["Buy", Validators.required],
        assetType: [undefined, Validators.required],
        label: [undefined, Validators.required],
        transactionPrice: [undefined, Validators.required],
        quantity: [undefined],
        transactionDate: [undefined],
        commission: [undefined],
        tax: [undefined],
        currency: ['EUR', Validators.required],
        notes: [undefined]
    })

    protected readonly CurrenciesConstant = CurrenciesConstant;
    protected readonly AssetTypeConstant = AssetTypesConstant;
    priceSelectTotal = true;

    constructor(
        private formBuilder: FormBuilder,
        private backendService: BackendService,
        private destroyRef: DestroyRef,
        private notification: NotificationService
    ) {
    }

    ngOnInit() {
        this.onTransactionTypeSelect();
    }

    onSubmit() {
        const transaction: TransactionDto = {...this.transactionForm.value};
        this.backendService.post('Transaction', transaction).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () =>
                    this.notification.showSuccess(),
                error: err =>
                    this.notification.showError()
            });
    }

    onTransactionTypeSelect() {
        this.transactionTypeForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (!this.isTransactionTypeSell) {
                this.taxForm.reset();
            }
        });
    }

    onPriceSelect() {
        if (!this.priceSelectTotal) {
            this.quantityForm.reset();
        }
    }

    get transactionTypeForm() {
        return this.transactionForm.get('transactionType') as FormControl;
    }

    get quantityForm() {
        return this.transactionForm.get('quantity') as FormControl;
    }

    get taxForm() {
        return this.transactionForm.get('tax') as FormControl;
    }

    get isTransactionTypeSell() {
        return this.transactionTypeForm.value === 'Sell';
    }
}
