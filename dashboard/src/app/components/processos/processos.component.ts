import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { ProcessoService } from '../../services/processo.service';
import { Processo } from '../../interfaces/processo.interface';
import { Batelada, Bateladas } from '../../interfaces/batelada.interface';
import { NgFor, NgIf } from '@angular/common';
import { BateladasComponent } from '../bateladas/bateladas.component';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-processos',
  standalone: true,
  imports: [NgFor, NgIf, ModalModule, BateladasComponent],
  templateUrl: './processos.component.html',
  styleUrl: './processos.component.scss'
})
export class ProcessosComponent {
  public bsModalRef?: BsModalRef;
  processos: Processo[] = [];

  constructor(
    private windowService: WindowService,
    private processoService: ProcessoService,
    private modalService: BsModalService,
  ) {
    this.windowService.changeWindowTitle('Processos');
    this.processoService.getProcessos()
    this.processoService.ProcessoChanged.subscribe((processos: Processo[]) => {
      this.processos = processos.sort((a, b) => {
        return b.processo_id - a.processo_id;
      });
    });
  }

  countBateladas(bateladas: {} | Batelada[]): number {
    return Object.keys(bateladas).length;
  }

  formateDateTime(date: string): string {
    return new Date(date).toLocaleString();
  }

  openBateladasModal(bateladas: {} | Bateladas) {
    const initialState = {
      bateladas: bateladas
    };
    this.bsModalRef = this.modalService.show(BateladasComponent, { initialState, backdrop: true, ignoreBackdropClick: true, class: 'modal-lg'});
    //console.log(this.bsModalRef);
  }
}
