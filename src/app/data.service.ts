// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateOrder(orderId: number, updatedOrder: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${orderId}`;
    return this.http.put<any>(updateUrl, updatedOrder);
  }

  // เพิ่มฟังก์ชันลบรายการ
  deleteOrder(orderId: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${orderId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
