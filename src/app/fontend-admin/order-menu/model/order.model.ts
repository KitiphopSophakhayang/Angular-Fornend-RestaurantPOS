export interface OrderItem {
  orderItemId: number;
  order: Order;
  orderDate: number;
  totalPrice: number;
  table: Table;
  status: string;
  quantity: number;
  transactionId: string;
}

export interface Order {
  id: number;
  name: string;
  foodType: string;
  price: number;
  filename: string;
  data: string;
}

export interface Table {
  tableId: number;
  tableNumber: number;
}

export interface UpdOrderStatusBean {
  status: string 
  orderItemId: number;    
}