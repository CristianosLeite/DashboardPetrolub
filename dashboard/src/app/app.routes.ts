import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PainelComponent } from './pages/painel/painel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';
import { ProcessosComponent } from './components/processos/processos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'painel/petrolub/ba', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: PainelComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'ticket', component: TicketComponent},
      { path: 'reports', component: ReportsComponent },
      { path: 'process', component: ProcessosComponent },
      { path: 'ticket/edit/:id', component: EditTicketComponent }
    ]
  },
];
