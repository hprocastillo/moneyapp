import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesRoutingModule} from './expenses-routing.module';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {ExpensesNewComponent} from './components/expenses-new/expenses-new.component';
import {ExpensesEditComponent} from './components/expenses-edit/expenses-edit.component';
import {ExpensesListComponent} from './components/expenses-list/expenses-list.component';
import {ExpensesViewComponent} from './components/expenses-view/expenses-view.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesNewComponent,
    ExpensesEditComponent,
    ExpensesListComponent,
    ExpensesViewComponent,
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ExpensesModule {
}
