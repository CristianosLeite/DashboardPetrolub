import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { Evento } from '../interfaces/evento.interface';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  EventoChanged = new EventEmitter<Evento[]>();

  constructor(private apiService: ApiService, private dateService: DateService) {
    this.dateService.DateChanged.subscribe(() => {
      this.getEventos();
    });
  }

  public async getEventos() {
    await this.apiService.getEventos().then((eventos: Evento[]) => {
      this.EventoChanged.emit(eventos);
    });
  }
}
