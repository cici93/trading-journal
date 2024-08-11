import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { PieChartComponent } from "../../components/pie-chart/pie-chart.component";
import { PointStylingComponent } from "../../components/line-chart/point-styling/point-styling.component";
import positionsMock from "../../../assets/mocks/positions-mock.json";
import { TransactionType } from "../../types/transaction.type";
import { Position } from "../../interfaces/position.interface";
import { VerticalDivComponent } from "../../components/vertical-div/vertical-div.component";
import { PositionCardComponent } from "../../components/position-card/position-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "../../services/data/data.service";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    PageHeaderComponent,
    PieChartComponent,
    PointStylingComponent,
    VerticalDivComponent,
    PositionCardComponent,
    SearchBarComponent,
    HttpClientModule

  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  selectedView: 'Tile' | 'Table' = 'Table';
  selectedPosition?: Position;
  filter = '';

  positionsSignal: WritableSignal<Position[]> = signal([]);
  filteredPositionSignal = computed(() => {
    return this.positionsSignal().filter(position => {
      return position.assetName!.toLowerCase().includes(this.filter.toLowerCase());
    });
  })


  chartData: {data: number[], label: string}[] = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];
  chartLabels: string[] = [];

  constructor(
      private dataService: DataService
  ) {
  }

  async ngOnInit() {
    this.selectedView = localStorage.getItem('selectedView') as 'Tile' | 'Table' || 'Tile';

    this.positionsSignal.set(positionsMock.map(position => ({
      ...position,
      transactions: position.transactions.map(transaction => ({
        ...transaction,
        transactionId: transaction.transactionId? transaction.transactionId : 0,
        transactionType: transaction.transactionType as TransactionType,
        transactionDate: new Date(transaction.transactionDate),
        total: transaction.total? transaction.total : 0,
      })),
    })));

    // const data = this.dataService.getHistoricalBars('AAPL', '2024-08-01', '2024-08-06').subscribe(
    //     data => {
    //       console.log(data);
    //     }
    // )

    const data = this.dataService.getSymbols().subscribe(
        data => {
          console.log(data);
        }
    )

  }



  updateData(pos: Position) {
    this.selectedPosition = pos;

    this.chartData = [];
    this.chartLabels = [];

    const data: number[] = [];
    pos.transactions?.forEach(t => {
      if (t.total) {
        data.push(t.total);
        this.chartLabels.push('')
      }
    })

    this.chartData = [
      {
        data,
        label: ''
      }
    ];
  }

  changeView(view: 'Tile' | 'Table') {
    localStorage.setItem('selectedView', view);
    this.selectedView = view;
  }

  filterData(filter: string) {
    this.filter = filter;
    this.positionsSignal.set([]);
    this.positionsSignal.set(positionsMock.map(position => ({
      ...position,
      transactions: position.transactions.map(transaction => ({
        ...transaction,
        transactionId: transaction.transactionId? transaction.transactionId : 0,
        transactionType: transaction.transactionType as TransactionType,
        transactionDate: new Date(transaction.transactionDate),
        total: transaction.total? transaction.total : 0,
      })),
    })));

  }

}
