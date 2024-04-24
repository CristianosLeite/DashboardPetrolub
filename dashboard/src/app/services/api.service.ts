import { Injectable, isDevMode  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from './loading.service';
import { Processo } from '../interfaces/processo.interface';
import { Evento } from '../interfaces/eventos.interface';
import { Nivel } from '../interfaces/nivel.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * @description Serviço responsável por realizar as requisições à API.
*/
export class ApiService {

  /**
   * @description URL base da API.
   * @param isDevMode Verifica se a aplicação está em modo de desenvolvimento.
   * @returns Retorna a URL base da API.
  */
    baseUrl = isDevMode() ? 'http://localhost:3000/api' : 'https://petrolub-be0cf9d63635.herokuapp.com/api';

    processo = {} as Processo;

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  /**
   * @description Retorna o cabeçalho da requisição.
   * @returns Retorna um objeto HttpHeaders.
   * @throws Retorna um erro caso não seja possível buscar o cabeçalho.
   * @param token Token de autenticação.
  */
    private async headers(): Promise<HttpHeaders> {
      return new HttpHeaders({
        Conection: 'keep-alive',
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    public async getProcessos(): Promise<Processo[]> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Processo[]>(`${this.baseUrl}/processo/all`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getProcesso(id: string): Promise<Processo> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Processo>(`${this.baseUrl}/processo/one/${id}`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getLastProcesso(): Promise<Processo> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Processo>(`${this.baseUrl}/processo/last`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getEventos(): Promise<Evento[]> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Evento[]>(`${this.baseUrl}/evento/all`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getNiveis(): Promise<Nivel[]> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Nivel[]>(`${this.baseUrl}/nivel/all`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getNivel(id: string): Promise<Nivel> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Nivel>(`${this.baseUrl}/nivel/one/${id}`));
      this.loadingService.setLoading(false);
      return response;
    }

    public async getLastNivel(): Promise<Nivel> {
      this.loadingService.setLoading(true);
      const response = await lastValueFrom(this.http.get<Nivel>(`${this.baseUrl}/nivel/last`));
      this.loadingService.setLoading(false);
      return response;
    }
}
