import { Injectable, EventEmitter } from '@angular/core';
import { Ticket } from '../interfaces/ticket.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  TicketChanged = new EventEmitter<Ticket[]>();
  tickets: Ticket[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  createTicket(ticket: Ticket) {
    return this.apiService.postTicket(ticket);
  }

  getTickets() {
    return this.apiService.getTickets();
  }

  getTicket(id: number) {
    return this.apiService.getTicket(id);
  }

  updateTicket(ticket: Ticket) {
    return this.apiService.updateTicket(ticket.id, ticket);
  }

  deleteTicket(ticket: Ticket) {
    return this.apiService.deleteTicket(ticket.id);
  }
}
