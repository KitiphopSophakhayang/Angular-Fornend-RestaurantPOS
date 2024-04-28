import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.data.selectedOrders.reduce((total: number, order: any) => total + order.total_price, 0);
  }
  
  onConfirm(): void {
   
  }

  onCancel(): void {
    
    
  }
}
