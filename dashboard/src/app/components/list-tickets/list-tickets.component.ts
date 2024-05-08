import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ticket } from '../../interfaces/ticket.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.scss'
})
export class ListTicketsComponent {
  tickets: Ticket[] = [
    {
      operation: "carregamento",
      branch: "cjba",
      description: "Teste",
      driver: "Cristiano",
      plate: "AAA0000",
      volume: 5000,
      id: 1,
      status: 'active',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      created_by: 'User 1'
    },
  ];

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  editTicket(ticket: Ticket) {
    console.log('Edit ticket: ', ticket);
  }

  deleteTicket(id: number) {
    console.log('Delete ticket with id: ', id);
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
