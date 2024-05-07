import { Injectable, EventEmitter } from '@angular/core';
import { Nivel } from '../interfaces/nivel.interface';
import { ApiService } from './api.service';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  LastNivelChanged = new EventEmitter<Nivel>();
  NiveisChanged = new EventEmitter<Nivel[]>();

  constructor(private apiService: ApiService, private dateService: DateService) {
    this.dateService.DateChanged.subscribe(() => {
      this.getNiveis();
      this.getLastNivel();
    });
  }

  public async getNiveis() {
    await this.apiService.getNiveis().then((niveis: Nivel[]) => {
      this.NiveisChanged.emit(niveis);
    });
  }

  public getNivel(id: string): Promise<Nivel> {
    return this.apiService.getNivel(id);
  }

  public async getLastNivel() {
    await this.apiService.getLastNivel().then((nivel: Nivel[]) => {
      this.LastNivelChanged.emit(nivel[0]);
    });
  }
}
