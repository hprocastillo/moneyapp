import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../auth/interfaces/user';
import {Movement} from '../../interfaces/movement';
import {MovementsService} from '../../movements.service';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-movements-current',
  imports: [NgForOf, DatePipe, NgClass, DecimalPipe, NgIf],
  templateUrl: './movements-current.component.html',
  styleUrl: './movements-current.component.scss'
})
export class MovementsCurrentComponent implements OnInit {
  /** injects **/
  public router = inject(Router);
  private movementsService: MovementsService = inject(MovementsService);

  /** variables **/
  public movements: Movement[] = [];
  public users: User[] = [];
  public filteredMovements: Movement[] = [];
  public sumatoria: number = 0;
  public years: number[] = [];

  /** Filters **/
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  ngOnInit(): void {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // JS: 0-indexed, filtro: 1-indexed

    this.years = Array.from({length: 11}, (_, i) => (currentYear - 5) + i);
    this.selectedYear = currentYear;
    this.selectedMonth = currentMonth;

    this.movementsService.getAllMovements().subscribe(movements => {
      this.movements = movements;
      this.applyFilters();
    });
  }

  async goView(id: string) {
    await this.router.navigate(['/movements/view', id,]);
  }

  /** Aplicar filtros **/
  applyFilters(): void {
    this.filteredMovements = this.movements.filter(movement => {
      let valid = true;
      if (this.selectedMonth && this.selectedYear) {
        const movDate = movement.createdAt.toDate();
        valid = valid &&
          movDate.getFullYear() === this.selectedYear &&
          (movDate.getMonth() + 1) === this.selectedMonth;
      }
      return valid;
    });
    /** Sumar ingresos y egresos de los movimientos filtrados **/
    const ingresos = this.filteredMovements
      .filter(m => m.type === 'INGRESO')
      .reduce((acc, m) => acc + (m.amount || 0), 0);
    const egresos = this.filteredMovements
      .filter(m => m.type === 'EGRESO')
      .reduce((acc, m) => acc + (m.amount || 0), 0);
    this.sumatoria = ingresos - egresos;
    this.filteredMovements = this.filteredMovements.slice(0, 10);
  }
}
