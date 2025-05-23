import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbDatepicker, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from 'rxjs';

const groups = [
  "Proyecto chorrillos",
  "Immobiliaria Pro Valencia",
  "Grupo C - 5to ciclo",
  "Cumpleaños mamá",
  "Chancha carro"
]

@Component({
  selector: 'app-groups-list',
  imports: [
    FormsModule,
     NgbTypeahead
  ],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss'
})
export class GroupsListComponent {
  /** injects **/
  public router = inject(Router);
  public location = inject(Location);

  /** variables **/
  public model: any;
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : groups.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );
}
