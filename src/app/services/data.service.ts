import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiningTable } from './dining-table.model';
import { FilterPipe, FilterByFoodTypePipe } from '../filter.pipe'; // เพิ่มนี้เข้ามา


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
  table: any | undefined;
  status: string | undefined;
  tableNumber: string | undefined;
  transaction_id: any;
  quantity: number | undefined;
  receiptNumber: string | undefined;
}

// export interface FoodType {
//   id: number;
//   name: string;
//   // สามารถเพิ่ม properties อื่น ๆ ตามต้องการได้
// }


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

  // addOrder(order: Order, file: File): Observable<Order> {
  //   const formData: FormData = new FormData();
  //   // ตรวจสอบว่าค่าของ order.name, order.foodType, และ order.price ไม่ใช่ undefined ก่อนที่จะใช้
  //   if (order.name) formData.append('name', order.name);
  //   if (order.foodType) formData.append('foodTypeId', order.foodType);
  //   if (order.price) formData.append('price', order.price.toString());
  //   formData.append('file', file);
  
  //   return this.http.post<Order>(`${this.baseUrl}/addOrder`, formData);
  // }
  

  // addOrder(order: Order, file: File, foodTypes: FoodType[]): Observable<Order> {
  //   const formData: FormData = new FormData();
    
  //   if (order.name) formData.append('name', order.name);
  //   if (order.foodType) {
  //     const foodType = foodTypes.find(type => type.name === order.foodType);
  //     if (foodType) formData.append('foodTypeId', foodType.id.toString());
  //   }
  //   if (order.price) formData.append('price', order.price.toString());
    
  //   formData.append('file', file);
  
  //   return this.http.post<Order>(`${this.baseUrl}/addOrder`, formData);
  // }
  


  // // generateReceiptNumber(): string {
  // //   return uuidv4(); // สร้าง UUID เป็นเลขใบเสร็จ
  // // }

  // addOrderItemsWithReceiptNumber(orderItems: OrderItem[]): Observable<any> {
  //   // สร้างเลขใบเสร็จสำหรับทุกรายการ
  //   // orderItems.forEach(orderItem => {
  //   //   orderItem.receiptNumber = this.generateReceiptNumber(); // สร้างเลขใบเสร็จ
  //   // });
  
  //   // ส่งข้อมูลรายการสั่งซื้อพร้อมเลขใบเสร็จไปยัง API หรือเซิร์ฟเวอร์เพื่อเก็บในฐานข้อมูล
  //   return this.http.post(`${this.baseUrl}/orderItems`, orderItems);
  // generateReceiptNumber(): string {
  //   return uuidv4(); // สร้าง UUID เป็นเลขใบเสร็จ
  // }
  
  generateReceiptNumber(): string {
    // สร้างเลขใบเสร็จตามที่ต้องการ เช่น ใช้เลขที่เพิ่มขึ้นทีละหนึ่งตามลำดับ
    return (Math.floor(Math.random() * 1000000) + 1).toString(); 
  }

  addOrderItemsWithReceiptNumber(orderItems: OrderItem[]): Observable<any> {
    // สร้างหรือเพิ่มเลขใบเสร็จในข้อมูลรายการสั่งซื้อทุกรายการ
    orderItems.forEach(orderItem => {
      orderItem.receiptNumber = this.generateReceiptNumber(); // สร้างเลขใบเสร็จ
    });

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

  getOrderByStatus(status: string): Observable<any> {
    let params = new HttpParams().set("status", status)
    return this.http.get<any>(`${this.baseUrl}/orderItems/getOrderStatus`, { params });
  }

  updateOrderStatus(orderData: any) {
    return this.http.put<any>(`${this.baseUrl}/orderItems/updateOrderStatus`, orderData)
  }

  getFoodTypes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8085/food-types');
  }

  
}
