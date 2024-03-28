import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
    private dataSubject = new BehaviorSubject<any>({});
    data$ = this.dataSubject.asObservable();
  
    setData(data: any) {
      this.dataSubject.next(data);
    }

}
