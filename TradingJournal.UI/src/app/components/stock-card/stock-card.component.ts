import { Component, computed, effect, input, signal, Signal } from '@angular/core';
import { StockDataDto } from "../../interfaces/rest/stock-data-dto";
import { DataService } from "../../services/data/data.service";
import { DatePipe, NgClass } from "@angular/common";


@Component({
  selector: 'app-stock-card',
  standalone: true,
    imports: [
        DatePipe,
        NgClass
    ],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
    data = input<StockDataDto>();

    constructor(
        private dataService: DataService
    ) {
        effect(() => {
            if (this.data()) {
                this.getStockImage(this.data()!)
            }
        });
    }




    log() {

        // console.log()
    }

    getStockImage(stockData: StockDataDto) {



        // this.dataService.getStockLogo(stockData).subscribe(imageUrl => {
        //     console.log('imageUrl', imageUrl)
        //     this.imgUrl.set(imageUrl);
        // });
    }
}
