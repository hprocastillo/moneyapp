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
      group: false,
      groupId: 'Cumpleaños de mamá',
      typeMovement: 'EGRESO',
      paymentMethod: 'TARJETA',
      description: 'Gastos en ferreteria para la obra de huamani',
      amount: 3487.09,
      comments: 'Se pago el adelanto con tarjeta ripley',
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      createdBy: 'Herbert Pro Castillo',
      createdAt: '20, Mayo 2025 12:08PM',
      updatedBy: 'Herbert Pro Castillo',
      updatedAt: '20, Mayo 2025 12:08PM'
    },
    {
      id: '2',
      group: false,
      groupId: 'NINGUNO',
      typeMovement: 'EGRESO',
      paymentMethod: 'YAPE',
      description: 'Compra de comida',
      amount: 200.00,
      comments: 'Compras en unicachi',
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      createdBy: 'Herbert Pro Castillo',
      createdAt: '19, Mayo 2025 04:01PM',
      updatedBy: 'Herbert Pro Castillo',
      updatedAt: '19, Mayo 2025 04:01PM'
    },
    {
      id: '3',
      group: false,
      groupId: 'NINGUNO',
      typeMovement: 'INGRESO',
      paymentMethod: 'EFECTIVO',
      description: 'Adelanto al albañil',
      amount: 300.00,
      comments: 'Quincena al albañil',
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      createdBy: 'Herbert Pro Castillo',
      createdAt: '20, Mayo 2025 12:08PM',
      updatedBy: 'Herbert Pro Castillo',
      updatedAt: '20, Mayo 2025 12:08PM'
    },
    {
      id: '4',
      group: false,
      groupId: 'NINGUNO',
      typeMovement: 'EGRESO',
      paymentMethod: 'TARJETA',
      description: 'Gastos en ferreteria',
      amount: 3487.09,
      comments: 'sin comentarios',
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      createdBy: 'Herbert Pro Castillo',
      createdAt: '20, Mayo 2025 12:08PM',
      updatedBy: 'Herbert Pro Castillo',
      updatedAt: '20, Mayo 2025 12:08PM'
    },
    {
      id: '5',
      group: false,
      groupId: 'NINGUNO',
      typeMovement: 'EGRESO',
      paymentMethod: 'TARJETA',
      description: 'Gastos en ferreteria',
      amount: 3487.09,
      comments: 'sin comentarios',
      receiptUrl: 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2F14f76b69-50e2-45e6-8844-5e2fcc50189f?alt=media&token=c61b5d48-9c97-4d9a-a1ec-66b35e634bc4',
      createdBy: 'Herbert Pro Castillo',
      createdAt: '20, Mayo 2025 12:08PM',
      updatedBy: 'Herbert Pro Castillo',
      updatedAt: '20, Mayo 2025 12:08PM'
    },
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
