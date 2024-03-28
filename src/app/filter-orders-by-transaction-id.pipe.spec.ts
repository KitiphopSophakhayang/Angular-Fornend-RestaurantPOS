import { FilterOrdersByTransactionIdPipe } from './filter-orders-by-transaction-id.pipe';

describe('FilterOrdersByTransactionIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterOrdersByTransactionIdPipe();
    expect(pipe).toBeTruthy();
  });
});
