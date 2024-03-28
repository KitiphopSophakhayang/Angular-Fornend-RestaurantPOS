
// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { OrderItem, OrderService } from '../services/data.service';

// @Component({
//   selector: 'app-receipt',
//   templateUrl: './receipt.component.html',
//   styleUrls: ['./receipt.component.css']
// })
// export class ReceiptComponent implements OnInit {
//   orders: OrderItem[] = [];
//   uniqueTransactionIds: string[] = [];
//   ordersFromReceipt: OrderItem[] = [];

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private orderService: OrderService,
//     private dialogRef: MatDialogRef<ReceiptComponent>
//   ) {}

//   ngOnInit(): void {
//     console.log("transactionId: "+JSON.stringify(this.data));
    
//     if (this.data && this.data.transactionId) {
//       this.getOrderItemsByTransactionId(this.data.transactionId);
//     } else {
//       console.error('Transaction ID is missing or undefined');
//     }
//   }

//   getOrderItemsByTransactionId(transactionId: string): void {
//     this.orderService.getOrderItemsByTransactionId(transactionId).subscribe(
//       (orders: OrderItem[]) => {
//         this.orders = orders;
//         this.ordersFromReceipt = orders; // อัปเดตค่า ordersFromReceipt ด้วยข้อมูลที่ได้
//         this.updateUniqueTransactionIds(); // เรียกใช้เมธอดเพื่ออัปเดตรายการ transactionId ที่ไม่ซ้ำกัน
//       },
//       (error: any) => {
//         console.error('Error fetching order items:', error);
//       }
//     );
//   }

//   updateUniqueTransactionIds(): void {
//     this.uniqueTransactionIds = Array.from(new Set(this.ordersFromReceipt.map(order => order.transaction_id)));
//   }

//   getTotalPrice(): number {
//     return this.orders.reduce((total, order) => total + (order.totalPrice ?? 0), 0);
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItem, OrderService } from '../services/data.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  orders: OrderItem[] = [];
  uniqueTransactionIds: string[] = [];
  ordersFromReceipt: OrderItem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<ReceiptComponent>
  ) {}

  ngOnInit(): void {
    console.log("transactionId: "+JSON.stringify(this.data));
    
    if (this.data && this.data.transactionId) {
      this.getOrderItemsByTransactionId(this.data.transactionId);
    } else {
      console.error('Transaction ID is missing or undefined');
    }
  }

  getOrderItemsByTransactionId(transactionId: string): void {
    this.orderService.getOrderItemsByTransactionId(transactionId).subscribe(
      (orders: OrderItem[]) => {
        // Filter out orders that do not have 'order' defined
        this.orders = orders.filter(order => order.order !== undefined);
        this.ordersFromReceipt = orders; // Update ordersFromReceipt with the retrieved data
        this.updateUniqueTransactionIds(); // Update uniqueTransactionIds to reflect non-duplicate transaction IDs
      },
      (error: any) => {
        console.error('Error fetching order items:', error);
      }
    );
  }

  updateUniqueTransactionIds(): void {
    // Extract unique transaction IDs from orders
    this.uniqueTransactionIds = Array.from(new Set(this.ordersFromReceipt.map(order => order.transaction_id)));
  }

  getTotalPrice(): number {
    // Calculate total price based on 'totalPrice' property of orders
    return this.orders.reduce((total, order) => total + (order.totalPrice ?? 0), 0);
  }

  onCancel(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
