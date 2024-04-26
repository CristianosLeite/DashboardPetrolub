import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [FooterComponent]
})
export class NotFoundComponent implements OnInit {

  error = 'Página não encontrada';
  code = 404;
  message = 'A página que você está procurando não existe, foi removida ou está temporáriamente indisponível';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService
  ) { }
  @Input() param: string | null = null;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['Error']) {
        this.error = params['Error'];
        this.code = params['Code'];
        this.message = params['Message'];
        this.param = 'serverError';
      }
    });
    this.param = 'clientError'
  }

  reloadApplication() {
    this.apiService.logout();
  }
}
