///////////////สำรอง


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from 'src/app/services/data.service';

import { MatDialog } from '@angular/material/dialog';
import { TableSelectionDialogComponent } from 'src/app/table-selection-dialog/table-selection-dialog.component';
import { ReceiptComponent } from 'src/app/receipt/receipt.component';
import { v4 as uuidv4 } from 'uuid'; // import uuidv4 มาใช้งาน



@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  orders: any = [];
  searchText: any;
  files: any = [];
  carts: any = [];
  selectedOrders: any = [];
  addOrders: boolean = false;
  customReceiptNumber: string | undefined;
  
  constructor(private orderService: OrderService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFiles();
    this.customReceiptNumber = 'ID' + Math.floor(Math.random() * 10000);
  }

  getFiles(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any[]) => {
        response.forEach(element => {
          element.test = 'data:image/jpeg;base64,' + element.data;
          this.orders.push(element);
        });
        console.log(this.orders);
      },
      (error: any) => {
        console.error('Error fetching files:', error);
      }
    );
  }

  // เพิ่มสินค้าลงในตะกร้า
  add_cart(order: any): void {
    // หาตำแหน่งของรายการสินค้าในตะกร้า
    let index = this.carts.indexOf(order);

    // ถ้าไม่มีรายการสินค้าในตะกร้า
    if (index === -1) {
      // เพิ่มรายการสินค้าลงในตะกร้า
      this.carts.push(order);
    } else {
      // ถ้ามีรายการสินค้าในตะกร้าแล้ว ให้ลบรายการสินค้าออกจากตะกร้า
      this.carts.splice(index, 1);
    }
  }

  // เพิ่มจำนวนสินค้าในตะกร้า
  increment(order: any): void {
    let index = this.selectedOrders.findIndex((item: any) => item === order);

    if (index === -1) {
      this.selectedOrders.push({ ...order, quantity: 1 });
    } else {
      this.selectedOrders[index].quantity++;
    }
  }

  // ลดจำนวนสินค้าในตะกร้า
  decrement(order: any): void {
    let index = this.selectedOrders.findIndex((item: any) => item === order);

    if (index !== -1) {
      if (this.selectedOrders[index].quantity > 1) {
        this.selectedOrders[index].quantity--;
      } else {
        this.selectedOrders.splice(index, 1);
      }
    }
  }

  // เพิ่มสินค้าลงในตะกร้า
  addSelectedOrder(order: Order): void {
    let index = this.selectedOrders.findIndex((item: any) => item === order);
    this.addOrders = true;
    if (index === -1) {
      // เพิ่มสินค้าลงในตะกร้าอาหาร
      this.selectedOrders.push({ ...order, quantity: 1 });
    } else {
      // เพิ่มจำนวนสินค้าในตะกร้าอาหาร
      this.selectedOrders[index].quantity++;
    }
  }
  
  
  // ลบสินค้าออกจากตะกร้า
  removeSelectedOrder(index: number): void {
    this.selectedOrders.splice(index, 1);
    this.carts.splice(index, 1);
  }
  
  cancelOrder(): void {
    // ลบรายการทั้งหมดที่เพิ่มเข้ามาทั้งหมดออกจากตะกร้าออเดอร์
    this.selectedOrders = [];
  }
  
// confirmOrder(selectedTable: any): void {
//   // คำนวณราคารวมของรายการอาหารที่เลือก
//   const totalPrice = this.getTotalPrice();

//   // เพิ่มสถานะ "pending" และ "totalPrice" ในรายการอาหารที่เลือก
//   this.selectedOrders.forEach((order: any) => {
//     order.status = 'pending';
//     order.totalPrice = totalPrice;
//     order.order = { id: order.id }; // เพิ่ม id ของรายการอาหารลงใน order
//   });

//   // เพิ่มข้อมูลเกี่ยวกับโต๊ะที่ผู้ใช้เลือกเข้าไปในรายการอาหารที่เลือก (หากมีการเลือกโต๊ะ)
//   if (selectedTable) {
//     this.selectedOrders.forEach((order: any) => {
//       order.table = selectedTable;
//     });
//   }

//   // ส่งรายการอาหารที่เลือกไปยัง API เพื่อบันทึกลงในฐานข้อมูล
//   this.orderService.addOrderItems(this.selectedOrders).subscribe(
//     (response) => {
//       // หากการสั่งซื้อสำเร็จ
//       console.log('Order placed successfully:', response);
//       // ล้างรายการอาหารที่เลือกไว้ในตะกร้า
//       this.selectedOrders = [];
//       // แสดงข้อความหรือทำการ redirect หรือดำเนินการต่อตามที่คุณต้องการ
//     },
//     (error) => {
//       // หากเกิดข้อผิดพลาดในการสั่งซื้อ
//       console.error('Error placing order:', error);
//       // ดำเนินการจัดการข้อผิดพลาดตามที่คุณต้องการ เช่น แสดงข้อความผิดพลาด ลองสั่งซื้ออีกครั้ง ฯลฯ
//     }
//   );
// }


confirmOrder(selectedTable: any): void {
  // คำนวณราคารวมของรายการอาหารที่เลือก
  const totalPrice = this.getTotalPrice();

  // เพิ่มสถานะ "pending" และ "totalPrice" ในรายการอาหารที่เลือก
  this.selectedOrders.forEach((order: any) => {
    order.status = 'pending';
    order.totalPrice = totalPrice;
    order.order = { id: order.id }; // เพิ่ม id ของรายการอาหารลงใน order
    order.receiptNumber = this.generateReceiptNumber(); // สร้างเลขใบเสร็จและเก็บไว้ในข้อมูลของรายการอาหาร
  });

  // เพิ่มข้อมูลเกี่ยวกับโต๊ะที่ผู้ใช้เลือกเข้าไปในรายการอาหารที่เลือก (หากมีการเลือกโต๊ะ)
  if (selectedTable) {
    this.selectedOrders.forEach((order: any) => {
      order.table = selectedTable;
    });
  }

  // ส่งรายการอาหารที่เลือกไปยัง API เพื่อบันทึกลงในฐานข้อมูล
  this.orderService.addOrderItems(this.selectedOrders).subscribe(
    (response) => {
      // หากการสั่งซื้อสำเร็จ
      console.log('Order placed successfully:', response);

      // แสดง popup ใบเสร็จ
      this.openReceiptDialog({
        transactionId: response.transactionId, // รหัสธุรกรรม
        tableNumber: selectedTable.tableNumber, // เลขโต๊ะ
        dateTime: new Date(), // วันเวลา
        selectedOrders: this.selectedOrders, // รายการอาหารที่เลือก
        totalPrice: totalPrice, // ราคารวม
      });

      // ล้างรายการอาหารที่เลือกไว้ในตะกร้า
      this.selectedOrders = [];
      // แสดงข้อความหรือทำการ redirect หรือดำเนินการต่อตามที่คุณต้องการ
    },
    (error) => {
      // หากเกิดข้อผิดพลาดในการสั่งซื้อ
      console.error('Error placing order:', error);
      // ดำเนินการจัดการข้อผิดพลาดตามที่คุณต้องการ เช่น แสดงข้อความผิดพลาด ลองสั่งซื้ออีกครั้ง ฯลฯ
    }
  );
}

  

  generateReceiptNumber(): string {
    const randomNumber = Math.floor(Math.random() * 10000);
    return 'ID' + randomNumber;
  }
  

refreshPage1(): void {
  // รีเฟรชหน้าเพื่อโหลดข้อมูลใหม่
  window.location.reload();
}



openReceiptDialog(data: any): void {
  const dialogRef = this.dialog.open(ReceiptComponent, {
    width: '500px',
    data: data // ส่งข้อมูลที่จะแสดงใน popup ใบเสร็จ
  });

  // เมื่อปิด popup ใบเสร็จ
  dialogRef.afterClosed().subscribe(result => {
    console.log('The receipt dialog was closed');
    // รีเฟรชหน้า
    this.refreshPage();
    // คำสั่งหลังจากปิด popup ใบเสร็จ (ถ้ามี)
  });
}

// ฟังก์ชันที่ใช้ในการรีเฟรชหน้า
refreshPage(): void {
  window.location.reload();
}



//เลือกได้ทั้งโต๊ะหรือไม่เลือกก็ได้
openTableSelectionDialog(): void {
  const dialogRef = this.dialog.open(TableSelectionDialogComponent, {
    width: '900px',
    height: '500px',
    data: {} // ส่งข้อมูลเพิ่มเติมได้ตามต้องการ
  });

  dialogRef.afterClosed().subscribe(selectedTable => {
    if (selectedTable) {
      // ทำการยืนยันออเดอร์เมื่อผู้ใช้เลือกโต๊ะและกดตกลง
      this.confirmOrder(selectedTable);
      
      // เมื่อเลือกโต๊ะและยืนยันออเดอร์เรียบร้อยแล้ว จึงเรียกใช้งานฟังก์ชันเพื่อแสดงใบเสร็จ
      this.openReceiptDialog({
        transactionId: selectedTable.transactionId, // รหัสธุรกรรม
        tableNumber: selectedTable.tableNumber, // เลขโต๊ะ
        dateTime: new Date(), // วันเวลา
        selectedOrders: this.selectedOrders, // รายการอาหารที่เลือก
        totalPrice: this.getTotalPrice() // ราคารวม
      });
    } else {
      dialogRef.close();
    }
  });
}


  getTotalPrice(): number {
    return this.selectedOrders.reduce((total: any, order: any) => total + order.price * order.quantity, 0);
  }
  
}


