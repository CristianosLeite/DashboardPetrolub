import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Processo } from '../interfaces/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(private apiService: ApiService) { }

  public async getProcessos(): Promise<Processo[]> {
    return this.apiService.getProcessos();
  }

  public async getProcesso(id: string): Promise<Processo> {
    return this.apiService.getProcesso(id);
  }

  public async getLastProcesso(): Promise<Processo> {
    return this.apiService.getLastProcesso();
  }
}
