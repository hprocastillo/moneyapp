import {Component, computed, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../modules/auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /** Inputs **/
  @Input() show:boolean | undefined;


  /** injects **/
  public auth = inject(AuthService);
  public router = inject(Router);

  /** signals **/
  public isLoggedIn = computed(() => !!this.auth.user());
}
