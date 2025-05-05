import {Component} from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';

@Component({
  selector: 'app-btn-new',
  standalone: false,
  templateUrl: './btn-new.component.html',
  styleUrl: './btn-new.component.scss'
})
export class BtnNewComponent {
  constructor(private buttonService: ButtonsService) {
  }

  press(): void {
    this.buttonService.emitButtonPress("NEW");
  }
}
