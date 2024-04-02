import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit{
    listTopMenu: any[] = []

    constructor(private service: ReportService) {}
    
    ngOnInit(): void {
        this.service.getTop5MenuList().subscribe(res => this.listTopMenu = res)
    }
}
