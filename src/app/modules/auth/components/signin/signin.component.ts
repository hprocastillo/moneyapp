import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  /** inject **/
  public auth = inject(AuthService);
}
