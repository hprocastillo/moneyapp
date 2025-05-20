import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movements-current',
  imports: [],
  templateUrl: './movements-current.component.html',
  styleUrl: './movements-current.component.scss'
})
export class MovementsCurrentComponent {
  /** injects **/
  private router = inject(Router);

  async goView(id: string) {
    await this.router.navigate(['/movements/view', id,]);
  }
}
