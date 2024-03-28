
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from '../services/data.service';

@Component({
  selector: 'app-table-selection-dialog',
  templateUrl: './table-selection-dialog.component.html',
  styleUrls: ['./table-selection-dialog.component.css']
})
export class TableSelectionDialogComponent implements OnInit {
  tables: any[] = [];
  selectedTable: any;

  constructor(
    public dialogRef: MatDialogRef<TableSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllTables();
  }

  getAllTables(): void {
    this.orderService.getAllTables().subscribe(tables => {
      this.tables = tables;
    });
  }


  selectTable(table: any): void {
    if (this.selectedTable === table) {
      // ถ้าโต๊ะที่เลือกอยู่เป็นโต๊ะเดียวกันที่ถูกเลือกมาก่อนหน้านี้
      // ให้ยกเลิกการเลือกโต๊ะนั้นๆ
      this.selectedTable = null;
    } else {
      // ถ้าโต๊ะที่เลือกไม่เหมือนกับโต๊ะที่ถูกเลือกมาก่อนหน้านี้
      // ให้เลือกโต๊ะนั้นๆ
      this.selectedTable = table;
    }
  }
  
  onConfirm(): void {
    this.dialogRef.close(this.selectedTable);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

