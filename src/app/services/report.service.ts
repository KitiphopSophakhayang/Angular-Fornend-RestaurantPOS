import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
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

  getTop5MenuList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orderItems/getTop5MenuList`);
  }
}
