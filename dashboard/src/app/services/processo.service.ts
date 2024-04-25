import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { Processo } from '../interfaces/processo.interface';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  protected subscription: Subscription = new Subscription();
  public processos = [] as Processo[];
  ProcessoChanged = new EventEmitter<Processo[]>();

  constructor(private apiService: ApiService) {
    this.getProcessos().then((processos: Processo[]) => {
      this.processos = processos;
      this.ProcessoChanged.emit(this.processos);
    }).then(() => {
      this.subscription = interval(1000).subscribe(() => {
        this.getProcessos().then((processos: Processo[]) => {
          this.processos = processos;
          this.ProcessoChanged.emit(this.processos);
        });
      });
    });
  }

  public getProcessos(): Promise<Processo[]> {
    return this.apiService.getProcessos();
  }

  public async getProcesso(id: string): Promise<Processo> {
    return await this.apiService.getProcesso(id);
  }

  public async getLastProcesso(): Promise<Processo> {
    return await this.apiService.getLastProcesso();
  }
}
