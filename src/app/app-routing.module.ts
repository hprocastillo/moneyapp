import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from './shared/components/page404/page404.component';
import {authGuard} from './modules/auth/guards/auth.guard';
import {loggedGuard} from './modules/auth/guards/logged.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'expenses', pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [loggedGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'expenses',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule)
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
