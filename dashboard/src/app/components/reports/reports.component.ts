import { Component } from '@angular/core';
import { PeriodSelectorComponent } from '../period-selector/period-selector.component';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { DateService } from '../../services/date.service';
import { ReportOptions } from '../../interfaces/reportOptions.interface';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [PeriodSelectorComponent, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportOptions: ReportOptions = {
    cbProcessos: false,
    cbNiveis: false,
    cbEventos: false,
    cbProcessosNiveis: false,
    cbProcessosEventos: false,
    cbNiveisEventos: false,
  };

  dateRange: Date[] = [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()];

  constructor(
    private reportService: ReportService,
    private dateService: DateService
  ) { }

  generateReport() {
    this.reportService.generateReport(this.dateRange, this.reportOptions);
  }

  periodChanged(dateRange: Date[]) {
    this.dateRange = [dateRange[0], new Date(new Date(dateRange[1]).setDate(dateRange[1].getDate() - 1))];
    this.dateService.DateChanged.emit(dateRange);
  }

  uncheckOthers(option: string) {
    if (option === 'cbProcessos') {
      this.reportOptions.cbNiveis = false;
      this.reportOptions.cbEventos = false;
    } else if (option === 'cbNiveis') {
      this.reportOptions.cbProcessos = false;
      this.reportOptions.cbEventos = false;
    } else if (option === 'cbEventos') {
      this.reportOptions.cbProcessos = false;
      this.reportOptions.cbNiveis = false;
    }
  }
}
