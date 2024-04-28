import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-menu-success',
  templateUrl: './order-menu-success.component.html',
  styleUrls: ['./order-menu-success.component.css'],
})
export class OrderMenuSuccessComponent {
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false;
  orderForm!: FormGroup;

  constructor(private service: OrderService, private fb: FormBuilder) {
    const payload = 'success';
    this.onInintForm();
    this.service
      .getOrderByStatus(payload)
      .subscribe((res) => {
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

  onOpen() {
    this.orderDisplayStatus = true;
  }

  onOpenOrder(order: any) {
    this.orderForm.patchValue({
      id: order.order?.id,
      name: order.order?.name,
      foodType: order.order?.foodType,
      price: order.order?.price,
      tableId: order.table?.tableId,
      status: order.status,
      orderId: order.orderItemId,
      quantity: order.quantity,
    });
  }
}