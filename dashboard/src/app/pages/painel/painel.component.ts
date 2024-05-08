import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NgIf } from '@angular/common';
import { ApiResponse, ApiService } from '../../services/api.service';
import { NotFoundService } from '../../services/not-found.service';
import { RouterOutlet } from '@angular/router';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, HeaderComponent, RouterOutlet, NgIf],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss'
})
export class PainelComponent implements OnInit, OnDestroy {
  user = {} as ApiResponse;
  windowTitle = 'Dashboard';

  constructor(private apiService: ApiService, private notFound: NotFoundService, private windowService: WindowService) {
    this.windowService.WindowChanged.subscribe((title: string) => {
      this.windowTitle = title;
    });
  }

  ngOnInit(): void {
    this.apiService.validateToken();
    this.apiService.UserAuthenticated.subscribe((response: ApiResponse) => {
      this.user = response;
    });

    setTimeout(() => {
      this.user.token === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 400);
  }

  ngOnDestroy(): void {
    this.apiService.UserAuthenticated.unsubscribe();
  }
}
