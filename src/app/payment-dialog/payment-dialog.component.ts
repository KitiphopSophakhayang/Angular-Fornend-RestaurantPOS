//หน้า popup ไว้เปิดแสดงจ่ายตัง
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
    console.log(this.data);
    
  }

  onConfirm(): void {
    // แปลง order_item_id จากสตริงเป็นอาร์เรย์ของ ID
    const orderItemIds = this.data.selectedOrders.flatMap((order: any) => order.order_item_id.split(','));
  
    // สร้าง payload สำหรับอัปเดตสถานะเป็น "complete" สำหรับทุกๆ order_item_id
    const payload = {
      orderItemIds: orderItemIds,
      status: 'complete'
    };
  
    // เรียกใช้งานเมธอดใน OrderService เพื่อทำการอัปเดตสถานะ
    this.orderService.updateOrderPaymentStatus(payload).subscribe((res: any) => {
      // เมื่ออัปเดตสำเร็จ ทำการรีโหลดหน้าเพื่อให้มั่นใจว่าข้อมูลถูกอัปเดตให้แล้ว
      window.location.reload();
  
      // แสดงข้อความแจ้งเตือนการยืนยันการชำระเงินสำเร็จ
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
    this.orderService.orderItemIds = []
  }
}
