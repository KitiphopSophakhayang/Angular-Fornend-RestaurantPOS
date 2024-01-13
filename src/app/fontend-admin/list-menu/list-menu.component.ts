import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

 orders: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }
}