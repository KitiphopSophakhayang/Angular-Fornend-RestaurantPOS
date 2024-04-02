import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService, OrderItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css'],
})
export class OrderMenuComponent implements OnInit {
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false
  temp!: any[]

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // const transactionId = '0896cb94-204b-45f0-9db6-6f9011cb3647';
    // this.getOrderItemsByTransactionId(transactionId);
    // this.orderService.getAllOrderItems().subscribe(res => console.log(res))
    this.orderService.getOrderByStatus("pending").subscribe((res: any) => {
        console.log(res);
        this.ordersFromReceipt = res
        this.getOrderByTransection(res)
    })
  }

  getOrderItemsByTransactionId(transactionId: string): void {
    this.orderService
      .getOrderItemsByTransactionId(transactionId)
      .subscribe((res: any) => {
        console.log(res[0]);
      });
  }

  getOrderByTransection(data: any) {
    data.filter((val: any) => {
        val.transactionId
    })
  }

  onOpenOrder() {
    console.log("test");
    this.orderDisplayStatus = true;
  }
}
