import { Component, computed, input, Input, InputSignal, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { LineChartData } from "../../../interfaces/charts/line-chart";

@Component({
  selector: 'app-point-styling',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './point-styling.component.html',
  styleUrl: './point-styling.component.scss'
})
export class PointStylingComponent {
  // @Input() chartData: {labels: string[], datasets: {data: number[],label: string}[] } = {
  //   labels: [],
  //   datasets: [
  //     {
  //       data:[],
  //       label:''
  //     }
  //   ]
  // }

  chartDataSignal: InputSignal<{labels: string[], datasets: {data: number[],label: string}[] } | undefined> = input();

  options = {
    scales: {
      y: {
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return '$' + value;
          }
        }
      }
    }
  }

  show = true;

  // lineChartData = {
  //   labels: ["","","","","","","","",""],
  //   datasets: [
  //     {
  //       data: [81,156,33,21,515,21,5,1,252],
  //       label: "Sales Percent"
  //     }
  //   ]
  // }
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes) {
  //     // console.log('changes', this.chartData)
  //   }
  // }


  onChartHover = ($event: any) => {
    // console.log('onChartHover', $event);
  };

  onChartClick = ($event: any) => {
    // console.log('onChartClick', $event);
  };


  log() {
    // console.log('chartData', this.chartData)
  }
}
