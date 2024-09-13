import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleRoutesService {

  public baseUrl = isDevMode() ?
    'http://localhost:3000' :
    'https://petrolub-be0cf9d63635.herokuapp.com';

    public loginRoute = `${this.baseUrl}/api/auth/login`;
    public logoutRoute = `${this.baseUrl}/api/auth/logout`;
    public validateTokenRoute = `${this.baseUrl}/api/auth/validate-token`;
}
