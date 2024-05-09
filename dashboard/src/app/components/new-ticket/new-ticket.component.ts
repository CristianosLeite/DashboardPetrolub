import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../../interfaces/ticket.interface';
import { TicketService } from '../../services/ticket.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {
  newTicket = {
    operation: '',
    branch: '',
    description: '',
    driver: '',
    plate: '',
    volume: 0,
    status: 'Ativo',
    created_at: '',
    updated_at: '',
    created_by: ''
  } as Ticket;

  constructor(
    private bsModalRef: BsModalRef,
    private ticketService: TicketService,
    private alertService: AlertService
  ) { }

  createTicket() {
    this.newTicket.created_by = localStorage.getItem('User')!.toString();
    this.ticketService.createTicket(this.newTicket).then((ticket) => {
      if (!ticket) {
        this.alertService.addAlert({type: 'danger', message: 'Erro ao criar ticket!'});
        return;
      }
      this.alertService.addAlert({type: 'success', message: 'Ticket criado com sucesso!'});
    });
    this.closeModal();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
