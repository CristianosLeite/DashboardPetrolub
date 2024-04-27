import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NotFoundService } from '../../services/not-found.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    username: '',
    usercode: ''
  }

  constructor(private apiService: ApiService, private notFoundService: NotFoundService) { }

  login() {
    this.apiService.login(this.user.username, this.user.usercode);
  }

  notFoundError() {
    this.notFoundService.notFoundEvent.emit('');
  }
}
