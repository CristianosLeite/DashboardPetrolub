import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ticket } from '../../interfaces/ticket.interface';
import { NgFor, DatePipe } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [NgFor, FormsModule, DatePipe],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  filter: string = ''

  constructor(
    private bsModalRef: BsModalRef,
    private ticketService: TicketService
  ) {
    this.ticketService.getTickets().then((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.applyFilter();
    });
    this.ticketService.TicketChanged.subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.applyFilter();
    });
  }

  editTicket(ticket: Ticket) {
    console.log('Edit ticket: ', ticket);
  }

  deleteTicket(id: number) {
    console.log('Delete ticket with id: ', id);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  filterTickets() {
    console.log('Filter tickets');
  }

  applyFilter() {
    if (this.filter) {
      this.filteredTickets = this.tickets.filter(ticket =>
        ticket.id.toString().includes(this.filter) ||
        ticket.branch.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.description.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.status.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.operation.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.driver.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.plate.toLowerCase().includes(this.filter.toLowerCase()) ||
        ticket.volume.toString().includes(this.filter) ||
        ticket.created_at.toString().includes(this.filter)
      );
    } else {
      this.filteredTickets = this.tickets;
    }
  }
}
