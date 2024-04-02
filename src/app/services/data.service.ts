import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiningTable } from './dining-table.model';

export class Order {
  id: number | undefined;
  name: string | undefined;
  foodType: string | undefined;
  price: number | undefined;
  imageURL: string | undefined;
  imageName: string | undefined;
}

export class OrderItem {
  orderItemId: number | undefined;
  order: Order | undefined;
  orderDate: Date | undefined;
  totalPrice: number | undefined;
  table: DiningTable | undefined;
  status: string | undefined;
  tableNumber: string | undefined;
  transaction_id: any;
  quantity: number | undefined;
  receiptNumber: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.apiUrl;
  private apiUrl = 'http://localhost:8085/api';
  protected transectionId = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  addOrder(order: Order, file: File): Observable<Order> {
    const formData: FormData = new FormData();
    // ตรวจสอบว่าค่าของ order.name, order.foodType, และ order.price ไม่ใช่ undefined ก่อนที่จะใช้
    if (order.name) formData.append('name', order.name);
    if (order.foodType) formData.append('foodType', order.foodType);
    if (order.price) formData.append('price', order.price.toString());
    formData.append('file', file);

    return this.http.post<Order>(`${this.baseUrl}/addOrder`, formData);
  }

  // generateReceiptNumber(): string {
  //   return uuidv4(); // สร้าง UUID เป็นเลขใบเสร็จ
  // }

  addOrderItemsWithReceiptNumber(orderItems: OrderItem[]): Observable<any> {
    // สร้างเลขใบเสร็จสำหรับทุกรายการ
    // orderItems.forEach(orderItem => {
    //   orderItem.receiptNumber = this.generateReceiptNumber(); // สร้างเลขใบเสร็จ
    // });

    // ส่งข้อมูลรายการสั่งซื้อพร้อมเลขใบเสร็จไปยัง API หรือเซิร์ฟเวอร์เพื่อเก็บในฐานข้อมูล
    return this.http.post(`${this.baseUrl}/orderItems`, orderItems);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orderById/${id}`);
  }
  updateOrder(id: number, formData: FormData): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/update/${id}`, formData);
  }

  addOrderItems(orderItems: OrderItem[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/orderItems`, orderItems);
  }

  getAllTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tables`);
  }

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.baseUrl}/orderItems`);
  }

  getOrderItemsByTransactionId(transactionId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(
      `${this.baseUrl}/orderItems/${transactionId}`
    );
  }

  getTableDataByTableId(tableId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(
      `${this.baseUrl}/orderItems/getTableData/${tableId}`
    );
  }

  getTotalPriceByWeekAndGetDayName(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orderItems/getTotalPriceByWeekAndGetDayName`);
  }

  getAllToTalPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/orderItems/getAllTotalPrice`);
  }

  getAllOrder(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/orderItems/getAllOrder`);
  }

  getAllTable(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tables/allTable`);
  }

  getAllMenu(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getAllMenu`);
  }

  getTotalPriceByDateInOneWeek(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orderItems/getTotalPriceByDateInOneWeek`);
  }

}
