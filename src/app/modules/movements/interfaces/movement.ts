export interface Movement {
  id: string;
  group: boolean;
  groupId: string;
  typeMovement: 'INGRESO' | 'EGRESO';
  paymentMethod: 'EFECTIVO' | 'YAPE' | 'TARJETA' | 'TRANSFERENCIA';
  description: string;
  amount: number;
  comments: string;
  receiptUrl: string;

  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}
