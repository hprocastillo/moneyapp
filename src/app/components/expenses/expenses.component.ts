import {Component, OnInit} from '@angular/core';
import {ButtonsService} from '../../services/buttons.service';

@Component({
  selector: 'app-expenses',
  standalone: false,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  public template: string = "LIST";

  constructor(private buttonService: ButtonsService) {
  }

  ngOnInit() {
    this.buttonService.buttonPress$.subscribe(template => {
      this.template = template;
    });
  }
}
