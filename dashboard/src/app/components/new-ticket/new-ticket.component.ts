import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {
  newTicket = {} as Ticket;
  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  createTicket() {
    console.log(this.newTicket);
    this.closeModal();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
