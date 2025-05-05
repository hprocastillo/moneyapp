import { Component } from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';

@Component({
  selector: 'app-btn-cancel',
  standalone: false,
  templateUrl: './btn-cancel.component.html',
  styleUrl: './btn-cancel.component.scss'
})
export class BtnCancelComponent {
  constructor(private buttonService: ButtonsService) {
  }

  press(): void {
    this.buttonService.emitButtonPress("LIST");
  }
}
