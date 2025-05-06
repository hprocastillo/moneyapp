import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from './components/page404/page404.component';
import {LoginComponent} from './components/login/login.component';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {IncomesComponent} from './components/incomes/incomes.component';
import {AuthGuard} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    component: ExpensesComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'incomes',
    canActivate: [AuthGuard],
    component: IncomesComponent
  },
  {
    path: '', redirectTo: '/expenses', pathMatch: 'full',
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
