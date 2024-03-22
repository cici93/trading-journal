import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Position } from "../../interfaces/position.interface";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AssetTypesConstant } from "../../constants/assetTypesConstant";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { TranslateModule } from "@ngx-translate/core";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { TransactionFormComponent } from "../transaction-form/transaction-form.component";
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NzCollapseComponent, NzCollapsePanelComponent } from "ng-zorro-antd/collapse";
import { Transaction } from "../../interfaces/transaction.interface";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-position-form',
  standalone: true,
  imports: [
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    TranslateModule,
    NzInputDirective,
    NzButtonComponent,
    NzIconDirective,
    TransactionFormComponent,
    NzDividerComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    DatePipe
  ],
  templateUrl: './position-form.component.html',
  styleUrl: './position-form.component.scss'
})
export class PositionFormComponent implements OnChanges {
  @Input() position?: Position;
  protected readonly AssetTypeConstant = AssetTypesConstant;
  positionForm: FormGroup = this.fb.group({
    positionId: [undefined],
    assetType: [undefined, Validators.required],
    label: [undefined, Validators.required],
    positionState: [undefined],
    roi: [undefined],
    transactions: this.fb.array([])
  });

  constructor(
      private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.position) {
      this.position.transactions?.forEach(() => {
        this.createTransactionForm();
      });

      this.positionForm.patchValue(this.position);
      console.log('form', this.positionForm.value)
    }

  }

  createTransactionForm() {
    const transactionForm = this.fb.group({
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
    });
    this.transactionForm.push(transactionForm);
  }

  get transactionForm() {
    return this.positionForm.get('transactions') as FormArray;
  }

  getTransactionHeader(t: Transaction) {
    return `Type: ${t.transactionType} Total: ${t.total} Date: ${t.transactionDate}`;
  }
  log() {
    // this.positionForm.disable()
    // this.createTransactionForm();

    // console.log('activePos', this.position)
    console.log('form', this.positionForm.value)
  }

}
