import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  option,
  backgroundColor,
  borderColor,
} from '../constants/chart.option';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  // styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit{
  @ViewChild('myChartBar') myChart: any;
  chart: any;
  label: any[] = []
  data: any[] = []

  constructor(private service: ReportService) {
    service.getTotalPriceByWeekAndGetDayName().subscribe(res => console.log(res))
  }
  
  ngOnInit(): void {
    this.service.getTotalPriceByDateInOneWeek().subscribe(res =>  {      
      console.log(res);
      
      this.label = Object.keys(res) 
      this.data = Object.values(res)
      this.label = this.label.map(date => date.split(' ')[0]);
      this.createChart();
    });
  }
  
  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'จำนวนยอดเงินรวมย้อนหลัง 7 วัน',
            data: this.data,
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
