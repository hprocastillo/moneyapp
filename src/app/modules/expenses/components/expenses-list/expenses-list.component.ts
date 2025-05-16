import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Expense} from '../../interfaces/expense';
import {ExpensesService} from '../../services/expenses.service';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-expenses-list',
  standalone: false,
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.scss'
})
export class ExpensesListComponent {
  /** io **/
  @Output() template = new EventEmitter<string>();

  /** variables **/
  public listExpenses$: Observable<Expense[]>;
  public totalAmount$: Observable<number>;
  public currentMonth: string = "";

  /** injects **/
  private expensesService = inject(ExpensesService);

  constructor() {
    this.listExpenses$ = this.expensesService.getExpensesOfCurrentMonth().pipe(
      map((expenses) =>
        expenses.sort((a, b) => new Date(b.createdAt.toDate()).getTime() - new Date(a.createdAt.toDate()).getTime())
      )
    );

    this.totalAmount$ = this.listExpenses$.pipe(
      map((expenses) => expenses.reduce((acc, exp) => acc + exp.amount, 0))
    );

    this.currentMonth = new Date().toLocaleDateString('es-PE', {month: 'long'});
  }

  pressNew(): void {
    this.template.emit("NEW");
  }
}
