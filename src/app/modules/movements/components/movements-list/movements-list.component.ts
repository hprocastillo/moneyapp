import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {NgbCollapse, NgbDatepicker, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from 'rxjs';
import {Location} from '@angular/common';

const movements = [
  "ferreteria",
  "adelanto albañil",
  "peluqueria",
  "compra de comida",
  "pago de servicios"
]

@Component({
  selector: 'app-movements-list',
  imports: [
    NgbCollapse,
    NgbDatepicker,
    FormsModule,
    NgbTypeahead,
  ],
  templateUrl: './movements-list.component.html',
  styleUrl: './movements-list.component.scss'
})
export class MovementsListComponent {
  /** injects **/
  private router = inject(Router);
  private location = inject(Location);


  /** variables **/
  public filterCollapsed: boolean = true;
  public model: any;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : movements.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  async goModule(url: string) {
    await this.router.navigate([url]);
  }

  goBack() {
    this.location.back();
  }

}
