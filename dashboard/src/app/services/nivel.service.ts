import { Injectable } from '@angular/core';
import { Nivel } from '../interfaces/nivel.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private apiService: ApiService) { }

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
