import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, Location, NgForOf, NgIf} from '@angular/common';
import {GroupedMovements, Movement} from '../../interfaces/movement';
import {MovementsService} from '../../movements.service';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {FooterComponent} from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-movements-list',
  imports: [FormsModule, DatePipe, NgForOf, DecimalPipe, NgIf, FooterComponent],
  templateUrl: './movements-list.component.html',
  styleUrl: './movements-list.component.scss'
})
export class MovementsListComponent implements OnInit {
  /** injects **/
  public router = inject(Router);
  public location = inject(Location);
  private movementsService = inject(MovementsService);

  /** variables **/
  public movements: Movement[] = [];
  public groupedMovements: GroupedMovements[] = [];

  ngOnInit(): void {
    this.movementsService.getAllMovements().subscribe(movements => {
      this.groupedMovements = this.groupByMonth(movements);
    });
  }

  private toJsDate(date: any): Date {
    // Para Firebase Timestamp
    if (date && typeof date.toDate === 'function') {
      return date.toDate();
    }
    // Si ya es Date
    if (date instanceof Date) {
      return date;
    }
    // Si es string ISO (por si acaso)
    return new Date(date);
  }

  private groupByMonth(movements: Movement[]): GroupedMovements[] {
    if (!movements || movements.length === 0) return [];
    const groups: GroupedMovements[] = [];
    let currentLabel = '';
    let currentItems: Movement[] = [];
    const now = new Date();

    for (const movement of movements) {
      const date: Date = this.toJsDate(movement.createdAt);
      const year = date.getFullYear();
      let label = format(date, 'MMMM', {locale: es});
      label = label.charAt(0).toUpperCase() + label.slice(1);
      if (year !== now.getFullYear()) {
        label += ` ${year}`;
      }

      if (label !== currentLabel) {
        if (currentItems.length > 0) {
          groups.push({label: currentLabel, items: currentItems});
        }
        currentLabel = label;
        currentItems = [];
      }
      currentItems.push(movement);
    }
    if (currentItems.length > 0) {
      groups.push({label: currentLabel, items: currentItems});
    }
    return groups;
  }


}
