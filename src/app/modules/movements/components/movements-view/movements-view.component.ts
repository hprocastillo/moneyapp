import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe, Location, NgIf} from '@angular/common';
import {MovementsService} from '../../movements.service';
import {Movement} from '../../interfaces/movement';

@Component({
  selector: 'app-movements-view',
  imports: [NgIf, DecimalPipe,],
  templateUrl: './movements-view.component.html',
  styleUrl: './movements-view.component.scss'
})
export class MovementsViewComponent implements OnInit {
  /** injects **/
  public router = inject(Router);
  public location = inject(Location);
  /** variables **/
  public movement = {} as Movement;
  private route = inject(ActivatedRoute);
  private movementsService = inject(MovementsService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.movementsService.getMovementById(id).subscribe(movement => {
      this.movement = movement!;
    })
    console.log(id);
  }

  goEdit(id: string): void {
    if (this.movement) {
      this.router.navigate(['/movements/edit', id]);
    }
  }


  goBack() {
    this.location.back();
  }
}
