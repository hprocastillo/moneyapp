import {Component, inject} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /** variables **/
  public collapsed = true;
  /** injects **/
  public auth = inject(AuthService);
}
