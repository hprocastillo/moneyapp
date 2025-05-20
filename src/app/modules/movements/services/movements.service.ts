import {Injectable} from '@angular/core';
import {Movement} from '../interfaces/movement';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private movements: Movement[] = [
    {
      id: '1',
      type: 'EGRESO',
      paymentMethod: 'TARJETA',
      description: 'Gastos en ferreteria',
      amount: 3487.09,
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      date: '20, Mayo 2025 12:08PM'
    },
    {
      id: '2',
      type: 'EGRESO',
      paymentMethod: 'YAPE',
      description: 'Adelanto albañil',
      amount: 500.00,
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      date: '18, Mayo 2025 01:30PM'
    },
    {
      id: '3',
      type: 'INGRESO',
      paymentMethod: 'EFECTIVO',
      description: 'Transferencia Edith',
      amount: 20000.09,
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      date: '15, Mayo 2025 05:20PM'
    }
  ];

  constructor() {
  }

  getMovementById(id: string) {
    const movement = this.movements.find(movement => movement.id === id);
    return of(movement);
  }

  updateMovement(movement: Movement) {
    const index = this.movements.findIndex(m => m.id === movement.id);
    if (index !== -1) this.movements[index] = movement;
    return of(movement);
  }
}
