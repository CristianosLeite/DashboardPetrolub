import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  WindowChanged = new EventEmitter<string>();
  windowTitle = 'Dashboard';
  constructor() { }

  changeWindowTitle(title: string): void {
    this.windowTitle = title;
    this.WindowChanged.emit(this.windowTitle);
  }
}
