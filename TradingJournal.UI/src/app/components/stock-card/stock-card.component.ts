import { Component, computed, input, Signal } from '@angular/core';
import { StockDataDto } from "../../interfaces/rest/stock-data-dto";


@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
    data = input<StockDataDto>();

}
