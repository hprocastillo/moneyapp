import { Component } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpensesService} from '../../../services/expenses.service';

@Component({
  selector: 'app-expenses-new',
  standalone: false,
  templateUrl: './expenses-new.component.html',
  styleUrl: './expenses-new.component.scss'
})
export class ExpensesNewComponent {
  public expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpensesService) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      amount: [0, Validators.required],
      receiptUrl: [''],
      paymentMethod: ['EFECTIVO', Validators.required],
    });
  }

  async submit() {
    if (this.expenseForm.valid) {
      const userId = 'USER_ID'; // Reemplaza por lógica real de auth
      const data = {
        ...this.expenseForm.value,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        createdBy: userId,
        updatedBy: userId,
      };
      await this.expenseService.create(data);
      this.expenseForm.reset();
    }
  }
}
