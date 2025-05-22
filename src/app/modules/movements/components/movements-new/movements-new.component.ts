import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-movements-new',
  imports: [],
  templateUrl: './movements-new.component.html',
  styleUrl: './movements-new.component.scss'
})
export class MovementsNewComponent {
  /** injects **/
  private router = inject(Router);
  public location = inject(Location);


  async goModule(url: string) {
    await this.router.navigate([url]);
  }


  goBack() {
    this.location.back();
  }
}
