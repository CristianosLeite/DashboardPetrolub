import { Injectable, Input, EventEmitter, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService implements OnInit {

  DateChanged = new EventEmitter<Date[]>();
  @Input() dateRange: Date[] = [new Date(new Date(new Date().setDate(new Date().getDate() - 7))), new Date()];

  constructor() { }

  ngOnInit(): void {
    this.DateChanged.emit(this.dateRange);
  }
}
