import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundService } from '../../services/not-found.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  usercode: string = '';

  constructor(private apiService: ApiService, private notFoundService: NotFoundService) { }

  login() {
    this.apiService.login(this.username, this.usercode);
  }

  notFoundError() {
    this.notFoundService.notFoundEvent.emit('');
  }
}
