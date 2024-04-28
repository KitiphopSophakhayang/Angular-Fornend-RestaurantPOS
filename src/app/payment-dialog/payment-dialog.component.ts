// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-payment-dialog',
//   templateUrl: './payment-dialog.component.html',
//   styleUrls: ['./payment-dialog.component.css']
// })
// export class PaymentDialogComponent {
//   totalPrice: number = 0;
//   totalQuantity: number = 0;

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     this.totalPrice = this.data.selectedOrders.reduce((total: number, order: any) => total + order.total_price, 0);
//   }
  
//   onConfirm(): void {
   
//   }

//   onCancel(): void {
    
    
//   }
// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { PaymentStatus } from '../fontend-admin/order-menu/model/order.model';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.data.selectedOrders.reduce((total: number, order: any) => total + order.total_price, 0);
  }

  onConfirm(): void {
    // สร้าง payload สำหรับอัปเดตสถานะเป็น "complete"
    const payload = {
      orderItemId: this.data.selectedOrders.map((order: any) => order.orderItemId),
      payment_status: 'complete' // เปลี่ยน key เป็น payment_status
    } as PaymentStatus;
    
  
    // เรียกใช้งานเมธอดใน OrderService เพื่อทำการอัปเดตสถานะ
    this.orderService.updateOrderPaymentStatus(payload).subscribe((res: any) => {
      // โหลดข้อมูลใหม่หลังจากอัปเดต
      // ในที่นี้คุณอาจต้องโหลดข้อมูลใหม่เพื่อปรับปรุงสถานะการแสดงผลในอินเตอร์เฟซหลังจากอัปเดตสถานะแล้ว
      // this.loadData();
  
      // แสดงข้อความแจ้งเตือนถ้าอัปเดตสถานะสำเร็จ
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'การยืนยันการชำระเงินสำเร็จแล้ว',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  
  

  onCancel(): void {
    // ปิด dialog โดยไม่ทำการอัปเดตสถานะ
  }
}
