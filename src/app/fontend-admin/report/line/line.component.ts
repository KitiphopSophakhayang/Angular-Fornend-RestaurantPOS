import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements AfterViewInit{
  @ViewChild('myChartLine') myChart: any
  public chart: any;

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

} 
