import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);

  async login(): Promise<void> {
    try {
      await this.authService.loginWithGoogle();
    } catch (e) {
      console.error(e);
    }
  }
}
