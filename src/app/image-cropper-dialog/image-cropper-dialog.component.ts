import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.css']
})
export class ImageCropperDialogComponent {
  imageChangedEvent: any;
  croppedImage: any;

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ImageCropperDialogComponent>, private dialogService: DialogService ) {}
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
    
  }
  
  done(): void {
    this.dialogService.data$.subscribe((res) => {
      console.log("data in component image: " , res);
      
    })
    
    this.dialogRef.close(this.croppedImage);
    this.imageChangedEvent = null; // ล้างค่าเมื่อป็อปอัพถูกปิด
  }


  // fileChangeEvent(event: any): void {
  //   this.imageChangedEvent = event;
  // }

  imageCropped(event: any): void {
    this.croppedImage = event.base64;    
  }

  // showCroppedImageInConsole(): void {
  //   console.log(this.croppedImage);
  // }

  // resetCroppedImage(): void {
  //   this.croppedImage = '';
  // }

  // done(): void {
  //   this.dialogRef.close(this.croppedImage);
  // }
}























// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-image-cropper-dialog',
//   templateUrl: './image-cropper-dialog.component.html',
//   styleUrls: ['./image-cropper-dialog.component.css'],
// })
// export class ImageCropperDialogComponent {
//   imageChangedEvent: any = '';
//   croppedImage: any = '';
//   createOrder: any;

//   constructor(
//     public dialogRef: MatDialogRef<ImageCropperDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.createOrder = data.createOrder;
//   }

//   fileChangeEvent(event: any): void {
//     this.imageChangedEvent = event;
//   }

//   imageCropped(event: any): void {
//     this.croppedImage = event.base64;
//   }

//   done(): void {
//     if (this.croppedImage && this.createOrder) {
//       this.createOrder(this.croppedImage);
//     }
//     this.dialogRef.close();
//   }
  
// }
