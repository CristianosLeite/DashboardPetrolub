import { AlertModule } from 'ngx-bootstrap/alert';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Alert } from '../../services/alert.service';
import { AlertService } from '../../services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [AlertModule, NgFor, NgIf],
  animations: [
    trigger('alertFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ]),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.AlertChanged.subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
    });
  }
}
