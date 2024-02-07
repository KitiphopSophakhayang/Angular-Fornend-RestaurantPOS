import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order, OrderService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  order: any = {};
  orders: any[] = [];
  testForm!: FormGroup;
  selectedOrder: any;
  showEditForm: boolean = false;
  CreateNewOrder: boolean = false;
  

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // เรียก OrderService เพื่อดึงข้อมูล orders
    this.orderService.getAllOrders().subscribe(data => {
      if (data) {
        this.orders = data;
        console.log(this.orders);

        // ตั้งค่า selectedOrder เป็นรายการแรก (ถ้ามี)
        if (this.orders.length > 0) {
          this.selectedOrder = { ...this.orders[0] };
        }
      }
    });

    this.onInit();
  }

  onInit(): void {
    this.testForm = this.fb.group({
      name: [null],
      price: [null],
      foodType: [null],
      imageUrl: [null]
    });
  }

  deleteOrder(): void {
    if (this.selectedOrder && this.selectedOrder.id) {
      this.orderService.deleteOrder(this.selectedOrder.id).subscribe(() => {
        // ลบ Order แล้วโหลดข้อมูลใหม่
        this.orderService.getAllOrders().subscribe(updatedData => {
          this.orders = updatedData;
        });
      });
    } else {
      console.error('Cannot delete. Selected order is undefined or does not have an id.');
    }
  }

  // อัปเดตรายการอาหาร
  updateOrder(): void {
    console.log(this.selectedOrder.name);
    this.orderService.updateOrder(this.selectedOrder).subscribe(() => {
      // ทำอะไรก็ตามที่ต้องการหลังจากที่อัปเดตเสร็จ
    });
  }

  onSelectOrder(order: any): void {
    this.selectedOrder = order;
    this.showEditForm = true;
  }

  // toggleCreateForm() {
  //   this.CreateNewOrder = !this.CreateNewOrder;
  //   if (this.CreateNewOrder) {
  //     this.selectedOrder = null; // เมื่อเปิดฟอร์มใหม่ รายการที่ถูกเลือกจะถูกล้างออก
  //   }
  // }

  // onCreateNewOrder(): void {
  //   this.CreateNewOrder = true;
  //   this.showEditForm = false; // ปิดฟอร์มแก้ไขหากมีการสร้างรายการใหม่
  // }
  
  onCreateNewOrder(): void {
    // ปิดฟอร์มแก้ไข
    this.showEditForm = false;
    
    // เปิด/ปิดฟอร์มสร้างรายการใหม่
    this.CreateNewOrder = !this.CreateNewOrder;
  
    // เมื่อเปิดฟอร์มสร้างรายการใหม่ รายการที่ถูกเลือกจะถูกล้างออก
    if (this.CreateNewOrder) {
      this.selectedOrder = null;
    }
  }
  
  toggleCreateForm() {
    // ปิดฟอร์มแก้ไข
    this.showEditForm = false;
    
    // เปิด/ปิดฟอร์มสร้างรายการใหม่
    this.CreateNewOrder = !this.CreateNewOrder;
  
    // เมื่อเปิดฟอร์มสร้างรายการใหม่ รายการที่ถูกเลือกจะถูกล้างออก
    if (this.CreateNewOrder) {
      this.selectedOrder = null;
    }
  }
  
  
  resetForm() {
    // ทำการรีเซ็ตค่าในฟอร์มตามที่ต้องการ
    this.testForm.reset();
    this.selectedOrder = {};  // หรือตามโครงสร้างของ selectedOrder
  }
  


  // สร้างรายการอาหาร
  createOrder(): void {
    this.order = {
      name: this.testForm.get('name')?.value,
      food_type: this.testForm.get('foodType')?.value,
      price: this.testForm.get('price')?.value,
      image: this.testForm.get('imageUrl')?.value
    };
  
    this.orderService.createOrder(this.order).subscribe((createdOrder: Order) => {
      console.log('Order created successfully!', createdOrder);
      // รีเซ็ตค่า id ให้เป็นค่าที่ได้จาก response
      this.orderService.getAllOrders().subscribe(updatedData => {
        this.orders = updatedData;
        // หาตำแหน่งของ createdOrder ใน updatedData
        const createdOrderIndex = this.orders.findIndex(order => order.name === createdOrder.name);
        // กำหนดค่า id ให้กับ this.order จาก createdOrder
        this.order.id = this.orders[createdOrderIndex].id;
      });
    });
  
    // ปิดฟอร์ม
    this.showEditForm = false;
  }
}


