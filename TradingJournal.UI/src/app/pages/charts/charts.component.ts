import { Component, DestroyRef, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { DataService } from "../../services/data/data.service";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map, switchMap } from "rxjs";
import { PointStylingComponent } from "../../components/line-chart/point-styling/point-styling.component";
import { StockCardComponent } from "../../components/stock-card/stock-card.component";
import { StockDataDto } from "../../interfaces/rest/stock-data-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { HistoricalBarDto } from "../../interfaces/rest/historical-bar-dto";
import { LineChartData } from "../../interfaces/charts/line-chart";
import { LoadingIndicatorComponent } from "../../components/loading-indicator/loading-indicator.component";
import { LoadingService } from "../../services/loading/loading.service";

@Component({
    selector: 'app-charts',
    standalone: true,
    imports: [
        PageHeaderComponent,
        SearchBarComponent,
        PointStylingComponent,
        StockCardComponent,
        LoadingIndicatorComponent
    ],
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {
    autoCompleteData: WritableSignal<string[] | undefined> = signal(undefined);

    activeStockData: WritableSignal<StockDataDto | undefined> = signal(undefined);


    chartDataSignal: WritableSignal<{
        labels: string[],
        datasets: { data: number[], label: string }[]
    } | undefined> = signal(undefined);


    chartData: { labels: string[], datasets: { data: number[], label: string }[] } = {
        labels: [],
        datasets: [
            {
                data: [],
                label: ''
            }
        ]
    }
    chartLabels: string[] = [];

    constructor(
        private dataService: DataService,
        private destroyRef: DestroyRef,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const symbol = params['symbol'];
            if (symbol) {
                this.getStockData(symbol);
            }
        });
    }

    getAutoCompleteData(search: string) {
        this.dataService.getSymbols(search)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .pipe(switchMap(() => this.dataService.getSymbols(search)))
            .pipe(map(data => data.map(item => item.ticker + " | " + item.companyName))
            ).subscribe(companyNames => {
            this.autoCompleteData.set(companyNames)
        })
    }

    getStockData(symbol: string) {
        this.dataService.getStockData(symbol)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .pipe(switchMap(() => this.dataService.getStockData(symbol)))
            .subscribe(stockData => {
                this.updateStockData(stockData);
            })
    }

    async updateStockData(stockData: StockDataDto) {

      this.activeStockData.set(stockData);
        this.updateChartData(stockData.historicalBars!);
        await this.router.navigate(['charts'], {queryParams: {symbol: stockData.ticker}});
    }


    updateChartData(historicalBarDto: HistoricalBarDto[]) {
        let data: LineChartData = {
            datasets: [
                {
                    data: [],
                    label: ''
                }
            ],
            labels: []
        };

        historicalBarDto.forEach(t => {
            if (!t.close) {
                return;
            }
            data.datasets[0].data.push(t.close);
            data.labels.push('');
        })
        this.chartDataSignal.set(data);

    }
}
