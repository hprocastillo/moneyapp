import {Routes} from '@angular/router';
import {SigninComponent} from './modules/auth/components/signin/signin.component';
import {MovementsComponent} from './modules/movements/components/movements/movements.component';
import {GroupsComponent} from './modules/groups/components/groups/groups.component';
import {ShareComponent} from './modules/share/components/share/share.component';
import {MovementsNewComponent} from './modules/movements/components/movements-new/movements-new.component';
import {SettingsComponent} from './shared/components/settings/settings.component';
import {HomeComponent} from './shared/components/home/home.component';
import {DashboardComponent} from './shared/components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {MovementsListComponent} from './modules/movements/components/movements-list/movements-list.component';
import {MovementsViewComponent} from './modules/movements/components/movements-view/movements-view.component';
import {MovementsEditComponent} from './modules/movements/components/movements-edit/movements-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'auth', component: SigninComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'movements', component: MovementsComponent
  },
  {
    path: 'movements/new', component: MovementsNewComponent
  },
  {
    path: 'movements/list', component: MovementsListComponent
  },
  {
    path: 'movements/view/:id', component: MovementsViewComponent
  },
  {
    path: 'movements/edit/:id', component: MovementsEditComponent
  },
  {
    path: 'groups', component: GroupsComponent
  },
  {
    path: 'share', component: ShareComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];
