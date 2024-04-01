import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
//   styleUrls: ['./card.component.css'],
})
export class CardComponent {        
    allTotalPrice: number = 0
    allOrder: number = 0
    allTable: number = 0
    allMenu: number = 0

    constructor(private service: OrderService) {
        this.service.getAllToTalPrice().subscribe(res => this.allTotalPrice = res)
        this.service.getAllOrder().subscribe(res => this.allOrder = res)
        this.service.getAllTable().subscribe(res => this.allTable = res)
        this.service.getAllMenu().subscribe(res => this.allMenu = res)
    }
}
