import { Component, OnChanges, OnDestroy, OnInit, NgZone, ViewChild } from '@angular/core';
import { NivelService } from '../../services/nivel.service';
import { ProcessoService } from '../../services/processo.service';
import { Nivel } from '../../interfaces/nivel.interface';
import { Processo } from '../../interfaces/processo.interface';
import { Subscription, interval } from 'rxjs';
import { Dataset } from '../../interfaces/dataset.interface';
import { BarChartOptionsInterface } from '../../interfaces/barChartOptions.interface';
import { BaseChartDirective } from 'ng2-charts';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-dif-litros',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './dif-litros.component.html',
  styleUrl: './dif-litros.component.scss'
})
export class DifLitrosComponent implements OnInit, OnChanges, OnDestroy {
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(): void {
  }
}
