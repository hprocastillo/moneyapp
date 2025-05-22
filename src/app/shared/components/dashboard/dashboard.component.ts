import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
  MovementsCurrentComponent
} from '../../../modules/movements/components/movements-current/movements-current.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MovementsCurrentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public router = inject(Router);
}
