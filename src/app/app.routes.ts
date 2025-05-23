import {Routes} from '@angular/router';
import {SigninComponent} from './modules/auth/components/signin/signin.component';
import {ShareComponent} from './modules/share/components/share/share.component';
import {MovementsNewComponent} from './modules/movements/components/movements-new/movements-new.component';
import {SettingsComponent} from './shared/components/settings/settings.component';
import {HomeComponent} from './shared/components/home/home.component';
import {DashboardComponent} from './shared/components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {MovementsListComponent} from './modules/movements/components/movements-list/movements-list.component';
import {MovementsViewComponent} from './modules/movements/components/movements-view/movements-view.component';
import {MovementsEditComponent} from './modules/movements/components/movements-edit/movements-edit.component';
import {GroupsListComponent} from './modules/groups/components/groups-list/groups-list.component';
import {GroupsNewComponent} from './modules/groups/components/groups-new/groups-new.component';
import {GroupsViewComponent} from './modules/groups/components/groups-view/groups-view.component';
import {GroupsEditComponent} from './modules/groups/components/groups-edit/groups-edit.component';

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
    path: 'movements/list', component: MovementsListComponent
  },
  {
    path: 'movements/new', component: MovementsNewComponent
  },
  {
    path: 'movements/view/:id', component: MovementsViewComponent
  },
  {
    path: 'movements/edit/:id', component: MovementsEditComponent
  },
  {
    path: 'groups/list', component: GroupsListComponent
  },
  {
    path: 'groups/new', component: GroupsNewComponent
  },
  {
    path: 'groups/view/:id', component: GroupsViewComponent
  },
  {
    path: 'groups/edit/:id', component: GroupsEditComponent
  },
  {
    path: 'share', component: ShareComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];
