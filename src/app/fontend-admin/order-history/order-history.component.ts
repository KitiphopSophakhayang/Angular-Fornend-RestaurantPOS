// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms'; // เพิ่ม import FormGroup, FormControl, FormBuilder
// import { OrderService } from 'src/app/services/data.service'; // ตรวจสอบว่าได้ import OrderService มาให้ถูกต้อง

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {
//   tableIds: number[] = [1, 2, 3, 4];
//   orderItemsByTable: any[][] = [];
//   orderDisplayStatus: boolean = false; // ประกาศตัวแปร orderDisplayStatus
//   orderForm!: FormGroup; // ประกาศตัวแปร orderForm
//   ordersFromReceipt: any[] = [];

//   constructor(private OrderService: OrderService, private fb: FormBuilder) { } // เพิ่ม FormBuilder เข้าไปใน constructor

//   ngOnInit(): void {
//     this.getOrderItemsForTables();
//     this.initializeForm(); // เรียกใช้เมื่อ Component ถูกโหลด
//   }

//   getOrderItemsForTables(): void {
//     this.OrderService.getOrderItemsForTables(this.tableIds)
//     .subscribe((data: any[][]) => {
//       this.orderItemsByTable = data;
//     });
    
//   }

//   initializeForm(): void {
//     this.orderForm = this.fb.group({
//       tableId: new FormControl(null),
//       name: new FormControl(null),
//       quantity: new FormControl(null),
//       status: new FormControl(null)
//     });
//   }

//   onOpenOrder(tableItems: any[]): void {
//     this.orderDisplayStatus = true;
//     this.orderForm.patchValue({
//       tableId: tableItems[0].tableId,
//       name: tableItems[0].name,
//       quantity: tableItems[0].quantity,
//       status: tableItems[0].status
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { OrderService } from 'src/app/services/data.service'; 
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {
//   ordersFromGroupedData: any[] = [];
//   ordersFromReceipt: any[] = [];
//   orderDisplayStatus: boolean = false;
//   orderForm!: FormGroup;

//   constructor(private orderService: OrderService, private fb: FormBuilder) {
//     this.onInintForm();
//   }
//   ngOnInit(): void {
//     this.getGroupedOrderItems();
//   }

//   getGroupedOrderItems(): void {
//     this.orderService.getGroupedOrderItems()
//       .subscribe((data: any[]) => {
//         this.ordersFromGroupedData = data;
//       });
//   }



//   onOpenOrder() {
//     this.orderDisplayStatus = true;
//   }

//   onInintForm() {
//     this.orderForm = this.fb.group({
//       id: new FormControl(null),
//       name: new FormControl(null),
//       foodType: new FormControl(null),
//       price: new FormControl(null),
//       tableId: new FormControl(null),
//       status: new FormControl(null),
//       orderId: new FormControl(null),
//       quantity: new FormControl(null),
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { OrderService } from 'src/app/services/data.service'; 
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {
//   ordersFromGroupedData: any[] = [];
//   ordersFromReceipt: any[] = [];
//   orderDisplayStatus: boolean = false;
//   orderForm!: FormGroup;

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
  

//   onOpen() {
//     this.orderDisplayStatus = true;
//   }

  
// }

// import { Component, OnInit } from '@angular/core';
// import { OrderService } from 'src/app/services/data.service'; 
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-order-history',
//   templateUrl: './order-history.component.html',
//   styleUrls: ['./order-history.component.css']
// })
// export class OrderHistoryComponent implements OnInit {
//   ordersFromGroupedData: any[] = [];
//   ordersFromReceipt: any[] = [];
//   orderDisplayStatus: boolean = false;
//   orderForm!: FormGroup;
//   selectedItem: any = null;
//   selectedItems: boolean[] = [];


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

//   // เพิ่ม method toggleSelection เพื่อเปลี่ยนสถานะของ checkbox
//   toggleSelection(index: number) {
//     this.selectedItems[index] = !this.selectedItems[index];
//   }


// }



import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/data.service'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // เพิ่ม import สำหรับ MatDialog
import { PaymentDialogComponent } from 'src/app/payment-dialog/payment-dialog.component'; // เพิ่ม import สำหรับ PaymentDialogComponent

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  ordersFromGroupedData: any[] = [];
  ordersFromReceipt: any[] = [];
  orderDisplayStatus: boolean = false;
  orderForm!: FormGroup;
  selectedItem: any = null;
  selectedItems: boolean[] = [];

  constructor(private orderService: OrderService, 
              private fb: FormBuilder,
              private dialog: MatDialog) { // เพิ่ม MatDialog ใน constructor
    this.onInitForm();
  }

  ngOnInit(): void {
    this.getGroupedOrderItems();
  }

  onInitForm(): void {
    this.orderForm = this.fb.group({
      // กำหนดค่าเริ่มต้นของฟอร์มตามต้องการ
    });
  }

  getGroupedOrderItems(): void {
    this.orderService.getGroupedOrderItems()
      .subscribe((data: any[]) => {
        this.ordersFromGroupedData = data;
        
      });
  }
  
  onOpen(item: any) {
    this.selectedItem = item;
    
    this.orderDisplayStatus = true;
  }

  // เพิ่ม method toggleSelection เพื่อเปลี่ยนสถานะของ checkbox
  toggleSelection(index: number, item: any) {
    this.orderService.orderItemIds.push(item.order_item_id)
    this.selectedItems[index] = !this.selectedItems[index];
  }

  openPaymentDialog(): void {
    // กรองเฉพาะรายการที่ถูกเลือก
    const selectedOrders = this.ordersFromGroupedData.filter((item, index) => this.selectedItems[index]);

  
    // เปิด Popup และส่งข้อมูลที่เลือกไปด้วย
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: { selectedOrders: selectedOrders }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ทำการยืนยันการชำระเงิน
      } else {
        // ยกเลิกการชำระเงิน
      } 
    });
  }
  
}



