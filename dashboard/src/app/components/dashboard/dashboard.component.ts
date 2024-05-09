import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NivelAtualComponent } from '../nivel-atual/nivel-atual.component';
import { QntLitrosComponent } from '../qnt-litros/qnt-litros.component';
import { LitrosPeriodoComponent } from '../litros-periodo/litros-periodo.component';
import { PeriodSelectorComponent } from '../period-selector/period-selector.component';
import { NgComponentOutlet, NgFor } from '@angular/common';
import { DateService } from '../../services/date.service';
import { WindowService } from '../../services/window.service';

interface WidgetIndex { id: number; name: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NivelAtualComponent, LitrosPeriodoComponent, QntLitrosComponent, PeriodSelectorComponent, NgFor, DragDropModule, NgComponentOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private dateService: DateService, private windowService: WindowService) {
    this.windowService.changeWindowTitle('Dashboard');
  }

  isMobile: boolean = false;

  widgets = ['app-litros-periodo', 'app-qnt-litros', 'app-nivel-atual'];
  widgetComponents: any = {
    'app-litros-periodo': LitrosPeriodoComponent,
    'app-qnt-litros': QntLitrosComponent,
    'app-nivel-atual': NivelAtualComponent
  };
  widgetIndexes: WidgetIndex[] = [];

  drop(event: CdkDragDrop<WidgetIndex>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  }

  periodChanged(event: Date[]) {
    this.dateService.DateChanged.emit(event);
  }
}
