import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
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
