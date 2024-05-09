import { Injectable, EventEmitter } from '@angular/core';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';
export type Alert = { type: AlertType, message: string };

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  AlertChanged = new EventEmitter<Alert[]>();
  alerts: Alert[] = [];

  constructor() { }

  addAlert(alert: Alert) {
    this.alerts.push(alert);
    this.AlertChanged.emit(this.alerts);
    setTimeout(() => {
      this.removeAlert(this.alerts.indexOf(alert));
    }, 3000);
  }

  removeAlert(index: number) {
    this.alerts.splice(index, 1);
    this.AlertChanged.emit(this.alerts);
  }
}
