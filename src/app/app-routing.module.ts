import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {Page404Component} from './components/page404/page404.component';
import {LoginComponent} from './components/login/login.component';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {IncomesComponent} from './components/incomes/incomes.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'expenses', pathMatch: 'full',
  },
  {
    path: 'auth', component: LoginComponent
  },
  {
    path: 'expenses', component: ExpensesComponent
  },
  {
    path: 'incomes', component: IncomesComponent
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
