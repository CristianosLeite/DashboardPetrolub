import { Component, OnInit } from '@angular/core';
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
export class PainelComponent implements OnInit {
  user = {} as ApiResponse;
  windowTitle = 'Dashboard';

  constructor(private apiService: ApiService, private notFound: NotFoundService, private windowService: WindowService) {
    this.windowService.WindowChanged.subscribe((title: string) => {
      this.windowTitle = title;
    });
  }

  ngOnInit(): void {
    this.apiService.validateToken().then((response: ApiResponse) => {
      this.user = response;
    }).catch(() => {
      this.notFound.notFoundEvent.emit('clientError');
    });

    setTimeout(() => {
      this.user.token === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 400);
  }
}
