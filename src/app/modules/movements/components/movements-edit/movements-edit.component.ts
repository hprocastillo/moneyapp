import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovementsService} from '../../services/movements.service';
import {Movement} from '../../interfaces/movement';
import {DecimalPipe, Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movements-edit',
  imports: [
    DecimalPipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './movements-edit.component.html',
  styleUrl: './movements-edit.component.scss'
})
export class MovementsEditComponent implements OnInit {
  /** injects **/
  private route = inject(ActivatedRoute);
  private movementsService = inject(MovementsService);
  private router = inject(Router);
  public location = inject(Location);

  /** variables **/
  public movement: Movement = {} as Movement;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.movementsService.getMovementById(id).subscribe(movement => {
      this.movement = {...movement!};
    })
    console.log(id);
  }

  goBack() {
    this.location.back();
  }


  save(): void {
    if (this.movement) {
      this.movementsService.updateMovement(this.movement).subscribe(() => {
        // Después de guardar, regresamos al detalle
        this.router.navigate(['/movements/view', this.movement!.id]);
      });
    }
  }
}
