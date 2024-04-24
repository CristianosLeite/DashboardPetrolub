import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'painel/petrolub/ba', pathMatch: 'full'},
  { path: 'painel/petrolub/ba', component: DashboardComponent }
];
