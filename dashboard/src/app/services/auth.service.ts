import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() userChanged: EventEmitter<string> = new EventEmitter();
  private isAuthenticated = true;
  authenticatedUser: string = '';

  checkAuth(): boolean {
    return this.isAuthenticated;
  }

  setIsAuthenticated(isAuthenticated: boolean, user: string): void {
    this.isAuthenticated = isAuthenticated;
    this.authenticatedUser = user;
    this.authChanged.emit(isAuthenticated);
    this.userChanged.emit(user);
  }
}
