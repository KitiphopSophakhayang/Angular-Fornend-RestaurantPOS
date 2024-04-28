// import { Component } from '@angular/core';
// import { ReportService } from 'src/app/services/report.service';

// @Component({
//   selector: 'app-card',
//   templateUrl: './card.component.html',
//   //   styleUrls: ['./card.component.css'],
// })
// export class CardComponent {
//   allTotalPrice: number = 0;
//   allOrder: number = 0;
//   allTable: number = 0;
//   allMenu: number = 0;

//   constructor(private service: ReportService) {
//     this.service
//       .getAllToTalPrice()
//       .subscribe((res) => (this.allTotalPrice = res));
//     this.service.getAllOrder().subscribe((res) => (this.allOrder = res));
//     this.service.getAllTable().subscribe((res) => (this.allTable = res));
//     this.service.getAllMenu().subscribe((res) => (this.allMenu = res));
//   }
  
// }
import { Component } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  monthlyTotalIncomes: any[] = [];
  allTotalPrice: number[] = []; // เปลี่ยนจาก number เป็น number[]

  allOrder: number = 0;
  allTable: number = 0;
  allMenu: number = 0;

  constructor(private service: ReportService) {
    this.service.getAllToTalPrice()
      .pipe(
        map((res: number) => [res]) // แปลงเป็น array ของ number
      )
      .subscribe((res: number[]) => { // ต้องรับค่าเป็น number[]
        this.allTotalPrice = res;
        this.monthlyTotalIncomes = this.groupByMonth(res);
      });
    this.service.getAllOrder().subscribe((res) => (this.allOrder = res));
    this.service.getAllTable().subscribe((res) => (this.allTable = res));
    this.service.getAllMenu().subscribe((res) => (this.allMenu = res));
  }

  groupByMonth(incomes: number[]): any[] {
    // กำหนด object ที่จะเก็บรายได้ตามเดือน
    const monthlyIncomes: any[] = [];

    // สร้าง object ของรายได้ตามเดือน
    incomes.forEach((income: number, index: number) => {
      const month = index + 1; // หาเดือน
      if (!monthlyIncomes[month]) {
        // ถ้ายังไม่มี object ของเดือนนั้น ให้สร้างใหม่
        monthlyIncomes[month] = {
          month: month,
          totalIncome: 0
        };
      }
      // เพิ่มรายได้ในเดือนนั้น
      monthlyIncomes[month].totalIncome += income;
    });

    // ตัด object ว่างทิ้งและเรียงลำดับตามเดือน
    return monthlyIncomes.filter(income => income !== undefined).sort((a, b) => a.month - b.month);
  }
}

