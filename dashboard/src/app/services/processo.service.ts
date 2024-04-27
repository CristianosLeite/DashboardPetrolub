import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { Processo } from '../interfaces/processo.interface';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  ProcessoChanged = new EventEmitter<Processo[]>();
  lastProcessoChanged = new EventEmitter<Processo>();

  constructor(private apiService: ApiService, private dateService: DateService) {
    this.dateService.DateChanged.subscribe(() => {
      this.getProcessos();
      this.getLastProcesso();
    });
  }

  public async getProcessos() {
    await this.apiService.getProcessos().then((processos: Processo[]) => {
      this.ProcessoChanged.emit(processos);
    });
  }

  public getProcesso(id: string): Promise<Processo> {
    return this.apiService.getProcesso(id);
  }

  public async getLastProcesso() {
    await this.apiService.getLastProcesso().then((processo: Processo) => {
      this.lastProcessoChanged.emit(processo);
    });
  }
}
