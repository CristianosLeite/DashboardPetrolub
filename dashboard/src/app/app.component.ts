import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { ApiResponse, ApiService } from './services/api.service';
import { NotFoundService } from './services/not-found.service';
import { LoadingComponent } from './components/loading/loading.component';
import { NgIf } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NotFoundComponent, AlertComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly apiService: ApiService,
    private readonly notFoundService: NotFoundService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private auth: AuthService
  ) { }

  isLoading: boolean = false;
  param: string = '';

  ngOnInit() {
    this.validateToken();
    this.loadingService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this.notFoundService.notFoundEvent.subscribe((param: string) => {
      this.param = param;
    });
    this.auth.authChanged.subscribe((status) => {
      this.param = status ? '' : 'clientError';
    });
  }

  logout() {
    this.apiService.logout();
  }

  notFoundError() {
    this.notFoundService.notFoundEvent.emit('');
  }

  async validateToken(): Promise<void> {
    this.param = '';
    await this.apiService.validateToken().then((response: ApiResponse) => {
      if (response.token) {
        this.router.navigate(['dashboard/home']);
      }
    }).catch(() => {
      this.alertService.addAlert({ type: 'danger', message: 'Erro ao validar token de autenticação.' });
    });
  }
}
