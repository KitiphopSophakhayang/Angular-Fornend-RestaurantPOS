import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  option,
  backgroundColor,
  borderColor,
} from '../constants/chart.option';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  // styleUrls: ['./bar.component.css']
})
export class BarComponent implements AfterViewInit {
  @ViewChild('myChartBar') myChart: any;
  chart: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    let label = [
      '2022-05-10',
      '2022-05-11',
      '2022-05-12',
      '2022-05-13',
      '2022-05-14',
      '2022-05-15',
      '2022-05-16',
      '2022-05-17',
    ];

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'จำนวนทั้งหมดออเดอร์ / วัน',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: option,
    });
  }
}
