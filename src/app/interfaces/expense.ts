import {Timestamp} from 'firebase/firestore';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  receiptUrl?: string;
  paymentMethod: "EFECTIVO" | "TARJETA" | "YAPE" | "TRANSFERENCIA";
  comment?: string

  createdBy: string;
  createdAt: Timestamp;
  updatedBy: string;
  updatedAt: Timestamp;
}
