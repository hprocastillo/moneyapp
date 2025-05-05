import { Component } from '@angular/core';
import {ButtonsService} from '../../../services/buttons.service';

@Component({
  selector: 'app-btn-save',
  standalone: false,
  templateUrl: './btn-save.component.html',
  styleUrl: './btn-save.component.scss'
})
export class BtnSaveComponent {
  constructor(private buttonService: ButtonsService) {
  }

  press(): void {
    this.buttonService.emitButtonPress("SAVE");
  }
}
