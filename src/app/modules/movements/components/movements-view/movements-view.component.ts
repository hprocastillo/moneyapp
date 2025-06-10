import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, DecimalPipe, Location, NgIf} from '@angular/common';
import {MovementsService} from '../../movements.service';
import {Movement} from '../../interfaces/movement';

@Component({
  selector: 'app-movements-view',
  imports: [NgIf, DecimalPipe, DatePipe,],
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
}
