import { Injectable, isDevMode, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from './loading.service';
import { Processo } from '../interfaces/processo.interface';
import { Evento } from '../interfaces/evento.interface';
import { Nivel } from '../interfaces/nivel.interface';
import { User } from '../interfaces/user.interface';
import { Ticket } from '../interfaces/ticket.interface';
import { AlertService } from './alert.service';

export interface ApiResponse {
  message: string;
  data: {
    name: string;
  };
  token?: string | undefined;
}

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

  @Output() UserAuthenticated = new EventEmitter<User>();

  constructor(private http: HttpClient, private loadingService: LoadingService, private alertService: AlertService) { }

  /**
 * @description Retorna o cabeçalho da requisição.
 * @returns Retorna um objeto HttpHeaders.
 * @throws Retorna um erro caso não seja possível buscar o cabeçalho.
 * @param token Token de autenticação.
*/
  private async headers(): Promise<HttpHeaders> {
    const token = await this.validateToken().then((response: any) => {
      return response.token;
    });
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Conection: 'keep-alive',
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }

  /**
  * @description Redireciona o usuário para a página de autenticação.
  * @param username Nome do usuário.
  * @param usercode Código do usuário.
 */
  private getToken(username: string, usercode: string): void {
    this.loadingService.setLoading(true);
    try {
      window.location.assign(`${this.baseUrl}/login?username=${username}&usercode=${usercode}&app=painel/petrolub/ba`);
    }
    catch (error) {
      this.loadingService.setLoading(false);
      throw error;
    }
  }

  /**
   * @description Verifica se token de autenticação é válido.
   * @returns Retorna um objeto do tipo User.
   * @throws Retorna um erro caso não seja possível buscar as informações do usuário.
  */
  async validateToken(): Promise<ApiResponse> {
    this.loadingService.setLoading(true);
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${this.baseUrl}/login/validate-token`, null, { withCredentials: true })
      );

      this.UserAuthenticated.emit(response);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Não foi possível validar o token!' });
      throw error;
    }
  }

   /**
   * Realiza o login do usuário.
   * @param username
   * @param usercode
   */
   async login(username: string, usercode: string): Promise<void> {
    this.getToken(username, usercode);
  }

  /**
   * Realiza o logout do usuário.
   */
  logout(): void {
    this.loadingService.setLoading(true);
    try {
      window.location.assign(`${this.baseUrl}/logout`);
      sessionStorage.clear();
      this.UserAuthenticated.emit({} as User);
    }
    catch (error) {
      this.loadingService.setLoading(false);
      throw error;
    }
    this.loadingService.setLoading(false);
  }

  public async getProcessos(): Promise<Processo[]> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Processo[]>(`${this.baseUrl}/processo/all`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar processos!' });
      throw error;
    }
  }

  public async getProcesso(id: string): Promise<Processo> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Processo>(`${this.baseUrl}/processo/one/${id}`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar processo!' });
      throw error;
    }
  }

  public async getLastProcesso(): Promise<Processo> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Processo>(`${this.baseUrl}/processo/last`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar último processo!' });
      this.loadingService.setLoading(false);
      throw error;
    }
  }

  public async getEventos(): Promise<Evento[]> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Evento[]>(`${this.baseUrl}/evento/all`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar eventos!' });
      throw error;
    }
  }

  public async getNiveis(): Promise<Nivel[]> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Nivel[]>(`${this.baseUrl}/nivel/all`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar níveis!' });
      throw error;
    }
  }

  public async getNivel(id: string): Promise<Nivel> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Nivel>(`${this.baseUrl}/nivel/one/${id}`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar nível!' });
      throw error;
    }
  }

  public async getLastNivel(): Promise<Nivel[]> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Nivel[]>(`${this.baseUrl}/nivel/last`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar último nível!' });
      throw error;
    }
  }

  public async postTicket(ticket: Ticket): Promise<Ticket> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.post<Ticket>(`${this.baseUrl}/tickets/create`, ticket, { headers, withCredentials: true, responseType: 'json' }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao criar ticket!' });
      throw error;
    }
  }

  public async getTickets(): Promise<Ticket[]> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Ticket[]>(`${this.baseUrl}/tickets/all`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar tickets!' });
      throw error;
    }
  }

  public async getTicket(id: string): Promise<Ticket> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.get<Ticket>(`${this.baseUrl}/tickets/one/${id}`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao buscar ticket!' });
      throw error;
    }
  }

  public async updateTicket(id: number, ticket: Ticket): Promise<Ticket> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.patch<Ticket>(`${this.baseUrl}/tickets/update/${id}`, ticket, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao atualizar ticket!' });
      throw error;
    }
  }

  public async deleteTicket(id: number): Promise<Ticket> {
    const headers = await this.headers();
    try {
      const response = await lastValueFrom(this.http.delete<Ticket>(`${this.baseUrl}/tickets/delete/${id}`, { headers, withCredentials: true }));
      this.loadingService.setLoading(false);
      return response;
    } catch (error) {
      this.loadingService.setLoading(false);
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao deletar ticket!' });
      throw error;
    }
  }
}
