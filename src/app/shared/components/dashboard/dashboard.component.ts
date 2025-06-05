import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
  MovementsCurrentComponent
} from '../../../modules/movements/components/movements-current/movements-current.component';
import {NgbDropdownConfig, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../modules/auth/auth.service';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [MovementsCurrentComponent, NgbDropdownModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  /** injects **/
  public router = inject(Router);
  private authService = inject(AuthService);

  constructor(config: NgbDropdownConfig) {
    config.autoClose = false;
  }

  async logout() {
    await this.authService.logout();
  }
}
