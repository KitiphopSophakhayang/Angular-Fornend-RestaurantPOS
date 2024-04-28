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
  styleUrls: ['./list-menu.component.css'],
})
export class ListMenuComponent implements OnInit {
  orders: any = [];
  searchText: any;
  files: any = [];
  carts: any = [];
  selectedOrders: any = [];
  addOrders: boolean = false;
  customReceiptNumber: string | undefined;

  foodTypes: any = [];

  foodTypeSelected: boolean = false; // เพิ่มตัวแปรนี้
  selectedFoodType: string | null = null;
  filteredOrders: any = [];
  

  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customReceiptNumber = 'ID' + Math.floor(Math.random() * 10000);
    // this.loadAllFoodType();
    this.getFiles();
    this.loadFoodTypes();
  }

  //ประเภทอาหารที่เอาไว้ออกมาแสดง
  loadFoodTypes(): void {
    this.orderService.getFoodTypes().subscribe((data: any[]) => {
      this.foodTypes = data;
    });
  }

  // loadAllFoodType(): void {
  //   this.orderService.getAllOrderItems().subscribe(res => this.filteredOrders = res)
  // }

  // selectCategory(foodType: any): void {
  //   const id = foodType.id;
  //   this. getFilesByFoodType(id);
    
  // }

  selectCategory(foodType: any): void {
    const id = foodType.id;
    this.getFilesByFoodType(id);
    this.foodTypeSelected = true; // เมื่อเลือกหมวดหมู่อาหาร
  }
  
  clearCategory(): void {
    this.foodTypeSelected = false; // เมื่อไม่ได้เลือกหมวดหมู่อาหาร
    // เรียกเมธอดอื่นที่อาจจะต้องเคลียร์ข้อมูลที่เกี่ยวข้องกับหมวดหมู่อาหารที่ถูกเลือกไว้
  }
  

  showAllOrders(): void {
    this.foodTypeSelected = false; // อย่าลืมตั้งค่า foodTypeSelected เป็น false เพื่อแสดงรายการทั้งหมด
    this.filteredOrders = this.files;
  }
  

  // getFiles(id: number): void {
  //   this.filteredOrders = []; // เคลียร์รายการอาหารที่มีอยู่แล้วทุกครั้งที่ดึงข้อมูลใหม่
  //   this.orderService.getFoodTypeById(id).subscribe(
  //     (response: any[]) => {
  //       response.forEach((element) => {
  //         element.test = 'data:image/jpeg;base64,' + element.data;
  //         this.filteredOrders.push(element);
  //       });
  //       console.log(this.filteredOrders);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching files:', error);
  //     }
  //   );
  // }


  getFiles(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any[]) => {     
        this.files = response.map(element => ({
          ...element,
          test: 'data:image/jpeg;base64,' + element.data
        }));
      },
      (error: any) => {
        console.error('Error fetching files:', error);
      }
    );
  }
  
  getFilesByFoodType(id: number): void {
    this.filteredOrders = [];
    this.orderService.getFoodTypeById(id).subscribe(
      (response: any[]) => {
        this.filteredOrders = response.map(element => ({
          ...element,
          test: 'data:image/jpeg;base64,' + element.data
        }));
      },
      (error: any) => {
        console.error('Error fetching files by food type:', error);
      }
    );
  }

  // selectCategory(foodType: any): void {
  //   this.selectedFoodType = foodType.food_type_id; // สร้าง selectedFoodType จาก food_type_id
  //   this.filterOrders(); // เรียกใช้งานฟังก์ชัน filterOrders เพื่อกรองรายการอาหาร
  // }

  // filterOrders(): void {
  //   if (this.selectedFoodType) {
  //     this.filteredOrders = this.orders.filter((order: any) => order.food_type_id === this.selectedFoodType);
  //   } else {
  //     this.filteredOrders = this.orders; // ถ้าไม่มีประเภทอาหารที่เลือกให้แสดงทั้งหมด
  //   }
  // }

  // getFiles(): void {
  //   this.orderService.getAllOrders().subscribe(
  //     (response: any[]) => {
  //       response.forEach(element => {
  //         if (!this.selectedFoodType || this.selectedFoodType.length === 0 || this.selectedFoodType.includes(element.category)) {
  //           element.test = 'data:image/jpeg;base64,' + element.data;
  //           this.filteredOrders.push(element); // เก็บข้อมูลที่ผ่านการกรองเท่านั้น
  //         }
  //       });
  //       console.log(this.filteredOrders);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching files:', error);
  //     }
  //   );
  // }

  // getFiles(): void {
  //   this.orderService.getAllOrders().subscribe(
  //     (response: any[]) => {
  //       response.forEach(element => {
  //         element.test = 'data:image/jpeg;base64,' + element.data;
  //         this.orders.push(element);
  //       });
  //       console.log(this.orders);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching files:', error);
  //     }
  //   );
  // }

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
      order.payment_status ='uncomplete';
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
      data: data, // ส่งข้อมูลที่จะแสดงใน popup ใบเสร็จ
    });

    // เมื่อปิด popup ใบเสร็จ
    dialogRef.afterClosed().subscribe((result) => {
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
      data: {}, // ส่งข้อมูลเพิ่มเติมได้ตามต้องการ
    });

    dialogRef.afterClosed().subscribe((selectedTable) => {
      if (selectedTable) {
        // ทำการยืนยันออเดอร์เมื่อผู้ใช้เลือกโต๊ะและกดตกลง
        this.confirmOrder(selectedTable);

        // เมื่อเลือกโต๊ะและยืนยันออเดอร์เรียบร้อยแล้ว จึงเรียกใช้งานฟังก์ชันเพื่อแสดงใบเสร็จ
        this.openReceiptDialog({
          transactionId: selectedTable.transactionId, // รหัสธุรกรรม
          tableNumber: selectedTable.tableNumber, // เลขโต๊ะ
          dateTime: new Date(), // วันเวลา
          selectedOrders: this.selectedOrders, // รายการอาหารที่เลือก
          totalPrice: this.getTotalPrice(), // ราคารวม
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getTotalPrice(): number {
    return this.selectedOrders.reduce(
      (total: any, order: any) => total + order.price * order.quantity,
      0
    );
  }
}
