import {Component, DestroyRef, OnInit} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {Position} from "../../../../types/position.type";
import {DataService} from "../../../../services/data/data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Stock} from "../../../../interfaces/stock.interface";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MockStock} from "../../../../../assets/mocks/stocks.mock";


@Component({
    selector: 'app-positions-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        TranslateModule,
        MatButton,
        FormsModule,
        ReactiveFormsModule,
        MatAutocomplete,
        MatOption,
        MatFormField,
        MatAutocompleteTrigger,
        MatInput,
        MatLabel
    ],
    templateUrl: './positions-dialog.component.html',
    styleUrl: './positions-dialog.component.scss'
})
export class PositionsDialogComponent implements OnInit {
    positionData: MockStock[] = [];
    stockForm: FormGroup = this.formBuilder.group({
        symbol: [''],
        name: [''],
        figi: [''],
        quantity: [undefined],
        price: [undefined]
    })
    selectedPosition?: MockStock;
    positionFilter?: MockStock[];
    input = new FormControl('');

    constructor(
        private dataService: DataService,
        private destroyRef: DestroyRef,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.positionData = this.dataService.fetchStockData();
        this.positionData.forEach(data => {
            data.info = `${data.symbol}/${data.name}/${data.figi}`;
        });



        // this.dataService.fetchStockData().pipe(takeUntilDestroyed(this.destroyRef))
        //     .subscribe(res => {
        //         res.map((obj : any) => {
        //             const stock: Stock = {
        //                 symbol: obj.symbol,
        //                 name: obj.description,
        //                 figi: obj.figi
        //             };
        //             this.positionData.push(stock);
        //         })
        //         console.log(this.positionData)
        //     })

        this.positionFilter = this.positionData;
        this.filterPosition();

    }

    get symbolForm() {
        return this.stockForm.get('symbol') as FormControl;
    }

    get nameForm() {
        return this.stockForm.get('name') as FormControl;
    }

    filterPosition() {
        this.input.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.positionFilter = this.positionData?.filter(pos =>
                pos.symbol?.toLowerCase().includes(this.input.value!.toLowerCase()) ||
                pos.name?.toLowerCase().includes(this.input.value!.toLowerCase()) ||
                pos.figi?.toLowerCase().includes(this.input.value!.toLowerCase())
            )
        })
    }

}
