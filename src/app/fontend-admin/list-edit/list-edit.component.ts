import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService, Order } from 'src/app/services/data.service';


@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent implements OnInit {
  orders: Order[] = [];
  testForm!: FormGroup;
  selectedOrder: Order | null = null;
  showEditForm = false;
  CreateNewOrder = false;
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  files: any[] = [];
  
  selectedFiles: File[] = [];
  foodTypes: any[] = [];

  foodDetails: any[] = [];

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onInit();
    this.getFiles();
    this.loadFoodTypes();
    this.getFoodDetails();
  }

  loadFoodTypes(): void {
    this.orderService.getFoodTypes().subscribe(
      (data: any[]) => {
        this.foodTypes = data;
      },
      (error: any) => {
        console.error('Error fetching food types:', error);
      }
    );
  }

  getFoodDetails(): void {
    this.orderService.getFoodDetails().subscribe(
      (data: any[]) => {
        this.foodDetails = data;
      },
      (error: any) => {
        console.error('Error fetching food details:', error);
      }
    );
  }

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

  onInit(): void {
    this.testForm = this.fb.group({
      name: [null],
      price: [null],
      foodType: [null],
      imageUrl: [null],
    });
  }

  deleteOrder(): void {
    if (this.selectedOrder && this.selectedOrder.id) {
      this.orderService.deleteOrder(this.selectedOrder.id).subscribe(() => {
        this.orderService.getAllOrders().subscribe((updatedData: Order[]) => {
          this.orders = updatedData;
        });
      });
    } else {
      console.error('Cannot delete. Selected order is undefined or does not have an id.');
    }
  }
  

  updateOrder(): void {
    if (this.selectedOrder && this.selectedOrder.id !== undefined) {
      if (this.selectedFile) {
        const formData = new FormData();
        // Append order details to formData
        formData.append('name', this.selectedOrder.name || '');
        formData.append('foodType', this.selectedOrder.foodType || '');
        formData.append('price', this.selectedOrder.price?.toString() || '');
        formData.append('file', this.selectedFile);
        // Call updateOrder service with selectedOrder id and formData
        this.orderService.updateOrder(this.selectedOrder.id, formData).subscribe(() => {
          // หลังจากที่อัปเดตคำสั่งเสร็จสิ้น เรียกใช้ฟังก์ชันสำหรับรีเฟรชหน้าเว็บ
          this.refreshPage();
        });
      } else {
        console.error('Selected file is undefined.');
      }
    } else {
      console.error('Selected order or its id is undefined.');
    }
  }
  
  
  // ฟังก์ชันสำหรับรีเฟรชหน้าเว็บ
  refreshPage() {
    window.location.reload();
  }
  
  
  onSelectOrder(order: Order): void {
    this.selectedOrder = order;
    this.CreateNewOrder = false; // สั่งให้ฟอร์มสำหรับเพิ่มรายการอาหารถูกซ่อนเมื่อเลือกรายการที่ต้องการแก้ไข
    this.showEditForm = true; // แสดงฟอร์มสำหรับแก้ไขรายการอาหาร
  }
  

  onCreateNewOrder(): void {
    this.showEditForm = false;
    this.CreateNewOrder = !this.CreateNewOrder;
    if (this.CreateNewOrder) {
      this.selectedOrder = null;
    }
  }

  resetForm(): void {
    this.testForm.reset();
    this.selectedOrder = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.selectedFiles = Array.from(event.target.files);
  }

  
  // createOrder(): void {
  //   if (!this.selectedFile) {
  //     console.error('No image selected.');
  //     return;
  //   }

  //   const order: Order = {
  //     id: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
  //     name: this.testForm.get('name')?.value,
  //     foodType: this.testForm.get('foodType')?.value,
  //     price: this.testForm.get('price')?.value,
  //     imageName: this.selectedFile.name,
  //     imageURL: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
  //   };

  //   this.orderService.addOrder(order, this.selectedFile).subscribe((response: any) => {
  //     this.resetForm();
  //     this.getFiles();
  //     this.CreateNewOrder = false;
  //   }, error => {
  //     console.error('Error uploading image:', error);
  //   });
  // } 

  // createOrder(): void {
  //   if (!this.selectedFile) {
  //     console.error('No image selected.');
  //     return;
  //   }
  
  //   const order: Order = {
  //     id: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
  //     name: this.testForm.get('name')?.value,
  //     foodType: this.testForm.get('foodType')?.value,
  //     price: this.testForm.get('price')?.value,
  //     imageName: this.selectedFile.name,
  //     imageURL: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
  //   };
  
  //   this.orderService.addOrder(order, this.selectedFile).subscribe((response: any) => {
  //     this.resetForm();
  //     this.getFiles();
  //     this.CreateNewOrder = false;
  //   }, error => {
  //     console.error('Error uploading image:', error);
  //   });
  // }
  
  createOrder(): void {
    if (!this.selectedFile) {
      console.error('No image selected.');
      return;
    }
  
    const order: Order = {
      id: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
      name: this.testForm.get('name')?.value,
      foodType: this.testForm.get('foodType')?.value,
      price: this.testForm.get('price')?.value,
      imageName: this.selectedFile.name,
      imageURL: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
    };
  
    this.orderService.addOrder(order, this.selectedFile).subscribe((response: any) => {
      this.resetForm();
      this.getFiles();
      this.CreateNewOrder = false;
    }, error => {
      console.error('Error uploading image:', error);
    });
  }

}






////ทดสอบ Cropper เฉยๆ

// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { OrderService, Order } from 'src/app/services/data.service';
// import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { ImageCropperDialogComponent } from 'src/app/image-cropper-dialog/image-cropper-dialog.component';

// import { HttpClient } from '@angular/common/http';
// import { DialogService } from 'src/app/services/dialog.service';
// import { MAT_MDC_DIALOG_DATA } from 'src/app/app.module';

// @Component({
//   selector: 'app-list-edit',
//   templateUrl: './list-edit.component.html',
//   styleUrls: ['./list-edit.component.css'],
// })
// export class ListEditComponent implements OnInit {
//   orders: Order[] = [];
//   testForm!: FormGroup;
//   selectedOrder: Order | null = null;
//   showEditForm = false;
//   CreateNewOrder = false;
//   selectedFile: File | null = null;
//   uploadProgress: number | null = null;
//   files: any[] = [];
  
//   selectedFiles: File[] = [];

//   ///
//   imageChangedEvent: any;
//   croppedImage: any;

//   ///

  

//   dialogRef: MatDialogRef<ImageCropperDialogComponent> | null = null; // ประกาศตัวแปรไว้เก็บป็อปอัพ

//   constructor(
//     private orderService: OrderService,
//     private fb: FormBuilder,
//     private dialog: MatDialog,
//     private http: HttpClient,
//     @Inject(MAT_MDC_DIALOG_DATA) public data: any,
//     private dialogService: DialogService
//   ) {}
//   ngOnInit(): void {
//     this.onInit();
//     this.getFiles();
//   }

//   getFiles(): void {
//     this.orderService.getAllOrders().subscribe(
//       (response: any[]) => {     
//         this.files = response.map(element => ({
//           ...element,
//           test: 'data:image/jpeg;base64,' + element.data
//         }));
//       },
//       (error: any) => {
//         console.error('Error fetching files:', error);
//       }
//     );
//   }

//   onInit(): void {
//     this.testForm = this.fb.group({
//       name: [null],
//       price: [null],
//       foodType: [null],
//       imageUrl: [null],
//     });
//   }

//   deleteOrder(): void {
//     if (this.selectedOrder && this.selectedOrder.id) {
//       this.orderService.deleteOrder(this.selectedOrder.id).subscribe(() => {
//         this.orderService.getAllOrders().subscribe((updatedData: Order[]) => {
//           this.orders = updatedData;
//         });
//       });
//     } else {
//       console.error('Cannot delete. Selected order is undefined or does not have an id.');
//     }
//   }

//   updateOrder(): void {
//     if (this.selectedOrder && this.selectedOrder.id !== undefined) {
//       if (this.selectedFile) {
//         const formData = new FormData();
//         // Append order details to formData
//         formData.append('name', this.selectedOrder.name || '');
//         formData.append('foodType', this.selectedOrder.foodType || '');
//         formData.append('price', this.selectedOrder.price?.toString() || '');
//         formData.append('file', this.selectedFile);
//         // Call updateOrder service with selectedOrder id and formData
//         this.orderService.updateOrder(this.selectedOrder.id, formData).subscribe(() => {
//           // Do something after updating order
//         });
//       } else {
//         console.error('Selected file is undefined.');
//       }
//     } else {
//       console.error('Selected order or its id is undefined.');
//     }
//   }
  
  
//   onSelectOrder(order: Order): void {
//     this.selectedOrder = order;
//     this.showEditForm = true;
//   }

//   onCreateNewOrder(): void {
//     this.showEditForm = false;
//     this.CreateNewOrder = !this.CreateNewOrder;
//     if (this.CreateNewOrder) {
//       this.selectedOrder = null;
//     }
//   }

//   resetForm(): void {
//     this.testForm.reset();
//     this.selectedOrder = null;
//   }

//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//     this.selectedFiles = Array.from(event.target.files);
//   }





//   // openDialog(): void {
//   //   if (this.dialogRef === null) {
//   //     this.dialogRef = this.dialog.open(ImageCropperDialogComponent, {
//   //       width: '500px',
//   //       height: '550px'
//   //     });

//   //     this.data = this.testForm.getRawValue()
//   //     this.dialogService.setData(this.data)
  
//   //     this.dialogRef.afterClosed().subscribe(result => {
//   //       console.log('The dialog was closed');
//   //       this.dialogRef = null;
//   //       // เรียกฟังก์ชัน onFileSelected ที่อยู่ในคอมโพเนนต์แม่ (parent component)
//   //       this.onFileSelected(this.imageChangedEvent);
//   //       this.imageChangedEvent = null; // ล้างค่าเมื่อป็อปอัพถูกปิด
//   //     });
//   //   } else {
//   //     this.dialogRef.close();
//   //     this.dialogRef = null;
//   //     // เรียกฟังก์ชัน onFileSelected ที่อยู่ในคอมโพเนนต์แม่ (parent component)
//   //     this.onFileSelected(this.imageChangedEvent);
//   //     this.imageChangedEvent = null; // ล้างค่าเมื่อป็อปอัพถูกปิด
//   //   }
//   // }
  
//   // // ฟังก์ชันสำหรับการเลือกไฟล์ภาพ
//   // onFileSelected(event: any): void {
//   //   const selectedFile = event.target.files[0];
//   //   if (selectedFile) {
//   //     this.selectedFiles.push(selectedFile);
//   //     // ประมวลผลภาพที่เลือก
//   //     this.imageCropped(selectedFile);
//   //   }
//   // }
  
//   // ฟังก์ชันสำหรับการตัดภาพ
//   imageCropped(file: File): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.croppedImage = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }




  
//   createOrder(): void {
//     if (!this.selectedFile) {
//       console.error('No image selected.');
//       return;
//     }

//     const order: Order = {
//       id: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
//       name: this.testForm.get('name')?.value,
//       foodType: this.testForm.get('foodType')?.value,
//       price: this.testForm.get('price')?.value,
//       imageName: this.selectedFile.name,
//       imageURL: undefined, // หรือค่าที่เหมาะสมตามการใช้งาน
//     };

//     this.orderService.addOrder(order, this.selectedFile).subscribe((response: any) => {
//       this.resetForm();
//       this.getFiles();
//       this.CreateNewOrder = false;
//     }, error => {
//       console.error('Error uploading image:', error);
//     });
//   }
  
// }


