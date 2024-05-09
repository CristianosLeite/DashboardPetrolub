import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../interfaces/ticket.interface';
import { Location } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.scss'
})
export class EditTicketComponent implements OnInit {
  ticket = {} as Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private location: Location,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ticketService.getTicket(id).then((ticket: Ticket) => {
      this.ticket = ticket;
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    this.ticketService.updateTicket(this.ticket).then((ticket: Ticket) => {
      if (!ticket) {
        this.alertService.addAlert({type: 'danger', message: 'Erro ao atualizar ticket!'});
        return;
      }
      this.alertService.addAlert({type: 'success', message: 'Ticket atualizado com sucesso!'});
      this.location.back();
    });
  }
}
