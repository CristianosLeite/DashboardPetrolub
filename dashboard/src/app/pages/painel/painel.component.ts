import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { NgIf } from '@angular/common';
import { ApiResponse, ApiService } from '../../services/api.service';
import { NotFoundService } from '../../services/not-found.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, HeaderComponent, DashboardComponent, NgIf],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss'
})
export class PainelComponent implements OnInit, OnDestroy {
  selectedComponent: string = 'dashboard';

  user = {} as ApiResponse;

  constructor(private apiService: ApiService, private notFound: NotFoundService) { }

  ngOnInit(): void {
    this.apiService.validateToken();
    this.apiService.UserAuthenticated.subscribe((response: ApiResponse) => {
      this.user = response;
    });

    setTimeout(() => {
      this.user.token === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 100);
  }

  ngOnDestroy(): void {
    this.apiService.UserAuthenticated.unsubscribe();
  }
}
