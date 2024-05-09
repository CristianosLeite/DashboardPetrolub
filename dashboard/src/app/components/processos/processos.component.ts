import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-processos',
  standalone: true,
  imports: [],
  templateUrl: './processos.component.html',
  styleUrl: './processos.component.scss'
})
export class ProcessosComponent {

  constructor(private windowService: WindowService) {
    this.windowService.changeWindowTitle('Processos');
  }
}
