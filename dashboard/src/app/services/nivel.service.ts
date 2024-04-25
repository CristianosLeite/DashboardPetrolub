import { Injectable, EventEmitter } from '@angular/core';
import { Nivel } from '../interfaces/nivel.interface';
import { ApiService } from './api.service';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  protected subscription: Subscription;
  public lastNivel = {} as Nivel;
  public niveis: Nivel[] = [];

  LastNivelChanged = new EventEmitter<Nivel>();
  NiveisChanged = new EventEmitter<Nivel[]>();

  constructor(private apiService: ApiService) {
    this.subscription = interval(10000).subscribe(async () => {
      Promise.all([await this.getLastNivel(), await this.getNiveis()]).then(([lastNivel, niveis]) => {
        this.lastNivel = lastNivel;
        this.niveis = niveis;
      });
      this.LastNivelChanged.emit(this.lastNivel);
      this.NiveisChanged.emit(this.niveis);
    });
  }

  public async getNiveis(): Promise<Nivel[]> {
    return this.apiService.getNiveis();
  }

  public async getNivel(id: string): Promise<Nivel> {
    return this.apiService.getNivel(id);
  }

  public async getLastNivel(): Promise<Nivel> {
    return this.apiService.getLastNivel();
  }
}
