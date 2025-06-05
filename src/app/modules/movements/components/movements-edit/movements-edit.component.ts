import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MovementsService} from '../../movements.service';
import {Movement} from '../../interfaces/movement';
import {Location, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movements-edit',
  imports: [NgIf, FormsModule],
  templateUrl: './movements-edit.component.html',
  styleUrl: './movements-edit.component.scss'
})
export class MovementsEditComponent implements OnInit {
  public location = inject(Location);
  /** variables **/
  public movement: Movement = {} as Movement;
  /** injects **/
  private route = inject(ActivatedRoute);
  private movementsService = inject(MovementsService);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.movementsService.getMovementById(id).subscribe(movement => {
      this.movement = {...movement!};
    })
    console.log(id);
  }


}
