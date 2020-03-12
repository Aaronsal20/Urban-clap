import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  isOpen = false;
  constructor() {}

  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

}
