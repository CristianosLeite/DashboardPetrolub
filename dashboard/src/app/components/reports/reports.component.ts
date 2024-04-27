import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeriodSelectorComponent } from '../period-selector/period-selector.component';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [PeriodSelectorComponent, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportOptions = {
    cbProcessos: false,
    cbNiveis: false,
    cbEventos: false,
    cbProcessosNiveis: false,
    cbProcessosEventos: false,
    cbNiveisEventos: false,
  }

  constructor(private reportService: ReportService, private dateService: DateService) { }

  generateReport() {
    this.reportService.generateReport(this.reportOptions);
  }

  periodChanged(dateRange: Date[]) {
    this.dateService.DateChanged.emit(dateRange);
  }
}
