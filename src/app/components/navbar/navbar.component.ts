import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'firebase/auth';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  /** injects **/
  private authService = inject(AuthService);

  /** variables **/
  public collapsed = true;
  public user$: Observable<User | null> = this.authService.user$;

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (e) {
      console.error(e);
    }
  }
}
