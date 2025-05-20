export interface Movement {
  id: string;
  type: 'INGRESO' | 'EGRESO';
  paymentMethod: 'EFECTIVO' | 'YAPE' | 'TARJETA' | 'TRANSFERENCIA';
  description: string;
  amount: number;
  receiptUrl: string;
  date: string;
}
