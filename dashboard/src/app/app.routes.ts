import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PainelComponent } from './pages/painel/painel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'painel/petrolub/ba/login', pathMatch: 'full'},
  { path: 'painel/petrolub/ba', redirectTo: 'painel/petrolub/ba/login', pathMatch: 'full'},
  { path: 'painel/petrolub/ba/login', component: LoginComponent },
  { path: 'painel/petrolub/ba/dashboard', component: PainelComponent },
  { path: '**', redirectTo: '' }
];
