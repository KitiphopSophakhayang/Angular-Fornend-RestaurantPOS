import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService, OrderItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css'],
})
export class OrderMenuComponent implements OnInit {
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false;
  temp!: any[];
  orderForm!: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.onInintForm();
  }

  ngOnInit(): void {
    this.orderService.getOrderByStatus('pending').subscribe((res: any[]) => {
      console.log(res);
      this.ordersFromReceipt = res;
    });
  }

  onInintForm() {
    this.orderForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null),
      foodType: new FormControl(null),
      price: new FormControl(null),
      tableId: new FormControl(null),
      status: new FormControl(null),
      orderId: new FormControl(null),
      quantity: new FormControl(null),
    });
  }

  getOrderItemsByTransactionId(transactionId: string): void {
    this.orderService
      .getOrderItemsByTransactionId(transactionId)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  onOpenOrder() {
    this.orderDisplayStatus = true;
  }

  onTest(order: OrderItem) {
    this.orderForm.patchValue({
      id: order.order?.id,
      name: order.order?.name,
      foodType: order.order?.foodType,
      price: order.order?.foodType,
      tableId: order.table?.tableId,
      status: order.status,
      orderId: order.orderItemId,
      quantity: order.quantity,
    });
  }
}
