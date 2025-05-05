import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {
  private buttonPress = new Subject<any>();
  buttonPress$ = this.buttonPress.asObservable();

  emitButtonPress(template: string) {
    this.buttonPress.next(template);
  }
}
