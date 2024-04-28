// import { Component, OnInit } from '@angular/core';
// import { OrderService } from 'src/app/services/data.service'; 
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-payment-history',
//   templateUrl: './payment-history.component.html',
//   styleUrls: ['./payment-history.component.css']
// })
// export class PaymentHistoryComponent implements OnInit {
//   ordersFromGroupedData: any[] = [];
//   ordersFromReceipt: any[] = [];
//   orderDisplayStatus: boolean = false;
//   orderForm!: FormGroup;
//   selectedItem: any = null;

//   constructor(private orderService: OrderService, private fb: FormBuilder) {
//     this.onInitForm();
//   }

//   ngOnInit(): void {
//     this.getGroupedOrderItems();
//   }

//   onInitForm(): void {
//     this.orderForm = this.fb.group({
//       // กำหนดค่าเริ่มต้นของฟอร์มตามต้องการ
//     });
//   }

//   getGroupedOrderItems(): void {
//     this.orderService.getGroupedOrderItems()
//       .subscribe((data: any[]) => {
//         this.ordersFromGroupedData = data;
//       });
//   }
  
//   onOpen(item: any) {
//     this.selectedItem = item;
//     this.orderDisplayStatus = true;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/data.service'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  ordersFromGroupedData: any[] = [];
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false;
  orderForm!: FormGroup;
  selectedItem: any = null;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.onInitForm();
  }

  ngOnInit(): void {
    this.getCompleteGroupedOrderItems(); // เรียกใช้เมธอดเพื่อดึงข้อมูล
  }

  onInitForm(): void {
    this.orderForm = this.fb.group({
      // กำหนดค่าเริ่มต้นของฟอร์มตามต้องการ
    });
  }

  getCompleteGroupedOrderItems(): void { // เปลี่ยนชื่อเมธอด
    this.orderService.getCompleteGroupedOrderItems() // เรียกใช้ getCompleteGroupedOrderItems จาก OrderService
      .subscribe((data: any[]) => {
        this.ordersFromGroupedData = data;
      });
  }
  
  onOpen(item: any) {
    this.selectedItem = item;
    this.orderDisplayStatus = true;
  }
}

