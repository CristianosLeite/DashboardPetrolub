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
    this.getNiveis().then((niveis: Nivel[]) => {
      this.niveis = niveis;
      this.NiveisChanged.emit(this.niveis);
    });
    this.getLastNivel().then((lastNivel: Nivel) => {
      this.lastNivel = lastNivel;
      this.LastNivelChanged.emit(this.lastNivel);
    });
    this.subscription = interval(1000).subscribe(async () => {
      Promise.all([this.getLastNivel(), this.getNiveis()]).then(([lastNivel, niveis]) => {
        this.lastNivel = lastNivel;
        this.niveis = niveis;
      });
      this.LastNivelChanged.emit(this.lastNivel);
      this.NiveisChanged.emit(this.niveis);
    });
  }

  public async getNiveis(): Promise<Nivel[]> {
    return await this.apiService.getNiveis();
  }

  public getNivel(id: string): Promise<Nivel> {
    return this.apiService.getNivel(id);
  }

  public async getLastNivel(): Promise<Nivel> {
    return await this.apiService.getLastNivel();
  }
}
