import {Component} from '@angular/core';

@Component({
  selector: 'app-expenses',
  standalone: false,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  public template: string = "LIST";

  getTemplate(template: string): void {
    this.template = template;
  }
}
