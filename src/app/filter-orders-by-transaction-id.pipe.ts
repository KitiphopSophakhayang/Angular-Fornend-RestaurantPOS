import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from './services/data.service';

@Pipe({
  name: 'filterOrdersByTransactionId'
})
export class FilterOrdersByTransactionIdPipe implements PipeTransform {
  transform(orders: OrderItem[], transactionId: string): OrderItem[] {
    return orders.filter(order => order.transaction_id === transactionId);
  }
}
