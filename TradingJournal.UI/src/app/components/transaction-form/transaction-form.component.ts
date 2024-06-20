import { Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Transaction } from "../../interfaces/transaction.interface";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { distinctUntilChanged, scan } from "rxjs";

@Component({
    selector: 'app-transaction-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzColDirective, NzInputDirective, NzSelectComponent, NzOptionComponent, TranslateModule, NzCheckboxComponent, NzInputNumberComponent, NzDatePickerComponent, KeyValuePipe, NzAutosizeDirective, NzRadioGroupComponent, NzRadioComponent, NzInputGroupComponent, NzButtonComponent, NzRowDirective, NzIconDirective],
    templateUrl: './transaction-form.component.html',
    styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnChanges, OnInit {

    @Input() transaction?: Transaction;
    @Output() onSaveOutput: EventEmitter<Transaction> = new EventEmitter<Transaction>();

    doEdit = false;
    placeholderTransaction?: Transaction;

    transactionForm: FormGroup = this.formBuilder.group({
        transactionId: [],
        transactionPrice: [undefined, Validators.required],
        transactionType: ["Buy", Validators.required],
        transactionDate: [undefined],
        quantity: [undefined],
        commission: [undefined],
        tax: [undefined],
        total: [undefined],
        currency: ['EUR', Validators.required],
        notes: [undefined],
        positionId: []
    })

    protected readonly CurrenciesConstant = CurrenciesConstant;


    constructor(
        private formBuilder: FormBuilder,
        private destroyRef: DestroyRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.transaction) {
            this.transactionForm.patchValue(this.transaction);
            this.transactionForm.disable();
        }
    }

    ngOnInit() {
        this.currencyForm.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
            distinctUntilChanged()
        ).subscribe(val => {
            this.currencyForm.patchValue(val);
        });
    }

    onSubmit() {
        const transaction: Transaction = {...this.transactionForm.value};
        this.onSaveOutput.emit(transaction);
        // this.backendService.post('Transaction', transaction).pipe(takeUntilDestroyed(this.destroyRef))
        //     .subscribe({
        //         next: () =>
        //             this.notification.showSuccess(),
        //         error: err =>
        //             this.notification.showError()
        //     });
    }

    onAction(type: 'edit' | 'delete' | 'cancel' | 'save') {
        if (type === 'edit') {
            this.doEdit = true;
            this.placeholderTransaction = { ...this.transactionForm.value };
            this.transactionForm.enable();
        }

        if (type === 'cancel') {
            this.doEdit = false;
            this.transactionForm.patchValue(this.placeholderTransaction!);
            this.placeholderTransaction = undefined;
            this.transactionForm.disable();
        }

        if (type === 'delete') {

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

   get currencyForm() {
        return this.transactionForm.get('currency') as FormControl;
   }

    test() {
        console.log(this.transactionForm.value)
    }
}
