import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { ListTicketsComponent } from '../list-tickets/list-tickets.component';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [ModalModule, NewTicketComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  bsModalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };

  constructor(
    private windowService: WindowService,
    private readonly modalService: BsModalService,
  ) {
    this.windowService.changeWindowTitle('Cadastro de Tickets');
  }

  newTicketModal() {
    this.bsModalRef = this.modalService.show(NewTicketComponent, this.config);
  }

  listTicketModal() {
    this.bsModalRef = this.modalService.show(ListTicketsComponent, this.config);
  }
}
