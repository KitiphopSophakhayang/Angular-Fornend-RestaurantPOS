// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl);
  }

  updateOrder(orderId: number, updatedOrder: any): Observable<any> {
    const updateUrl = `${environment.apiUrl}/${orderId}`;
    return this.http.put<any>(updateUrl, updatedOrder);
  }

  // เพิ่มฟังก์ชันลบรายการ
  deleteOrder(orderId: number): Observable<void> {
    const deleteUrl = `${environment.apiUrl}/${orderId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
