// list-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;
  editForm!: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  onInitForm() {
    this.editForm = this.fb.group({
      price: [null],
      description: [null],
      name: [null],
      foodType: [null],
    })
  }

  ngOnInit() {
    this.onInitForm()    
    this.dataService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  editOrder(order: any): void {
    this.selectedOrder = order;
    this.dataService.getOrders
  }

  saveChanges(): void {

    console.log(this.editForm.getRawValue());
    

    if (this.selectedOrder) {
      this.dataService.updateOrder(this.selectedOrder.id, this.selectedOrder).subscribe(
        (updatedOrder) => {
          const index = this.orders.findIndex((order) => order.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          this.selectedOrder = null;
        },
        (error) => {
          console.error('Error updating order:', error);
        }
      );
    }
  }

  deleteOrder(): void {
    if (this.selectedOrder) {
      this.dataService.deleteOrder(this.selectedOrder.id).subscribe(
        () => {
          this.orders = this.orders.filter((order) => order.id !== this.selectedOrder.id);
          this.selectedOrder = null;
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}
