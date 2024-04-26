import { DatePipe } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-period-selector',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, BsDatepickerModule, DatePipe],
  templateUrl: './period-selector.component.html',
  styleUrl: './period-selector.component.scss'
})
export class PeriodSelectorComponent {
  bsValue = new Date(new Date().setDate(new Date().getDate() - 7));
  @Output() periodChanged = new EventEmitter<Date[]>();
  private _bsRangeValue: Date[] = [];
  maxDate = new Date();

  constructor(private bsLocaleService: BsLocaleService) {
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];

    defineLocale('pt-br', ptBrLocale);
    this.bsLocaleService.use('pt-br');
  }

  get bsRangeValue(): Date[] {
    return this._bsRangeValue;
  }

  set bsRangeValue(value: Date[]) {
    this._bsRangeValue = value;
    this.periodChanged.emit([
      new Date(this.bsRangeValue[0].getFullYear(), this.bsRangeValue[0].getMonth(), this.bsRangeValue[0].getDate()),
      new Date(this.bsRangeValue[1].getFullYear(), this.bsRangeValue[1].getMonth(), this.bsRangeValue[1].getDate() + 1)
    ]);
  }
}
