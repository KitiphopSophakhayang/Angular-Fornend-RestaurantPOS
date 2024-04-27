import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderService, OrderItem } from 'src/app/services/data.service';
import { UpdOrderStatusBean } from './model/order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css'],
})
export class OrderMenuComponent implements OnInit {
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false;
  orderForm!: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.onInintForm();
  }

  ngOnInit(): void {
    const payload = 'pending';
    this.orderService.getOrderByStatus(payload).subscribe((res: any[]) => {
      // console.log(res);
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

  // getOrderItemsByTransactionId(transactionId: string): void {
  //   this.orderService
  //     .getOrderItemsByTransactionId(transactionId)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });
  // }

  onOpenOrder() {
    this.orderDisplayStatus = true;
  }

  onTest(order: OrderItem) {
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

  onUpdateStatus() {
    const payload = {
      orderItemId: this.orderForm.controls['orderId'].value,
      status: 'success',
    } as UpdOrderStatusBean;

    this.orderService.updateOrderStatus(payload).subscribe((res: boolean) => {
      this.orderDisplayStatus = false;
      this.ngOnInit();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'ทำเสร็จเรียบร้อย',
        showConfirmButton: false,
        timer: 1450,
      });
    });
  }
}
