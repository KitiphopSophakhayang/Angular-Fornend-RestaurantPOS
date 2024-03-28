// import { Component, OnInit } from '@angular/core';
// import { OrderService, OrderItem } from 'src/app/services/data.service';

// @Component({
//   selector: 'app-order-menu',
//   templateUrl: './order-menu.component.html',
//   styleUrls: ['./order-menu.component.css']
// })
// export class OrderMenuComponent implements OnInit {
//   ordersFromReceipt: OrderItem[] = [];

//   constructor(private orderService: OrderService) {}

//   ngOnInit(): void {
//     // เรียกใช้งานฟังก์ชัน getOrderItemsByTransactionId() โดยส่งค่า Transaction ID ที่ต้องการ
//     const transactionId = '9adc735b-6104-42dd-a20c-c50628ebb51e'; // ใส่ Transaction ID ที่ต้องการดึงข้อมูลออเดอร์
//     this.getOrderItemsByTransactionId(transactionId);
//   }

//   getOrderItemsByTransactionId(transactionId: string): void {
//     // เรียกใช้งาน OrderService เพื่อดึงข้อมูลออเดอร์ตาม Transaction ID
//     this.orderService.getOrderItemsByTransactionId(transactionId).subscribe(
//       (orderItems: OrderItem[]) => {
//         this.ordersFromReceipt = orderItems; // กำหนดค่า orderItems ที่ได้รับเข้ามาให้กับตัวแปร ordersFromReceipt
//       },
//       (error: any) => {
//         console.error('Error fetching order items:', error); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการดึงข้อมูล
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { OrderService, OrderItem } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})
export class OrderMenuComponent implements OnInit {
  ordersFromReceipt: OrderItem[] = [];
  selectedTransactionId: string = ''; // เพิ่ม property สำหรับเก็บ transactionId ที่เลือก

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // ไม่เรียก getAllOrderItems() ใน ngOnInit แล้ว จะเรียกใน onSelectTransaction เมื่อมีการเลือก transaction
  }

  getAllOrderItems(): void {
    if (this.selectedTransactionId) {
        this.orderService.getOrderItemsByTransactionId(this.selectedTransactionId).subscribe(
            (orderItems: OrderItem[]) => {
                this.ordersFromReceipt = orderItems;
            },
            (error: any) => {
                console.error('Error fetching order items:', error);
            }
        );
    }
  }

  uniqueTransactionIds(): string[] {
    return Array.from(new Set(this.ordersFromReceipt.map(order => order.transaction_id)));
  }

  onSelectTransaction(transactionId: string): void {
    this.selectedTransactionId = transactionId;
    this.getAllOrderItems();
  }
}
