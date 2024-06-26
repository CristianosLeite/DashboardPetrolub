import { Component, OnInit, OnChanges, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { Processo } from '../../interfaces/processo.interface';
import { Subscription, interval } from 'rxjs';
import { Dataset } from '../../interfaces/dataset.interface';
import { BarChartOptionsInterface } from '../../interfaces/barChartOptions.interface';
import { BaseChartDirective } from 'ng2-charts';
import { GraphComponent } from '../graph/graph.component';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-qnt-litros',
  standalone: true,
  imports: [GraphComponent],
  templateUrl: './qnt-litros.component.html',
  styleUrl: './qnt-litros.component.scss'
})
export class QntLitrosComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  dateRange: Date[] = [new Date(new Date(new Date().setDate(new Date().getDate() - 8))), new Date()];

  constructor(private processoService: ProcessoService, private ngZone: NgZone, private dateService: DateService) { }

  processos = [] as Processo[];
  litrosCarregamento = 0;
  litrosDescarregamento = 0;

  dataset: Dataset = {
    labels: ['Carregamento', 'Descarregamento'],
    datasets: [
      {
        label: 'Litros por operação',
        data: [0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1
      }
    ]
  };

  chartOptions: BarChartOptionsInterface = {
    responsive: true,
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          text: 'Operação'
        }
      },
      y: {
        display: false,
        title: {
          display: false,
          text: 'Volume'
        }
      }
    },
    maintainAspectRatio: false,
  }

  ngOnInit(): void {
    this.processoService.getProcessos();
    this.processoService.ProcessoChanged.subscribe((processos) => {
      this.processos = processos;
      this.updateChart();
    });
    this.subscription = interval(60000).subscribe(() => {
      this.processoService.getProcessos();
      this.updateChart();
    });
    this.dateService.DateChanged.subscribe((dateRange: Date[]) => {
      this.dateRange = dateRange;
    });
  }

  ngOnChanges(): void {
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateChart() {
    this.ngZone.run(() => {
      this.setData(this.dateRange[0], this.dateRange[1]);
      this.chart?.update();
    });
  }

  async setData(startDate: Date, endDate: Date) {
    this.litrosDescarregamento = 0;
    this.litrosCarregamento = 0;
    this.processos.forEach((processo) => {
      const processoDate = new Date(processo.data_hora_inicio);
      if (processoDate >= startDate && processoDate <= endDate) {
        if (processo.tipo_operacao === 'DESCARREGAMENTO') {
          this.litrosDescarregamento += processo.total_litros_processo;
        } else if (processo.tipo_operacao === 'CARREGAMENTO') {
          this.litrosCarregamento += processo.total_litros_processo;
        }
      }
    });
    this.dataset.datasets[0].data[0] = this.litrosCarregamento;
    this.dataset.datasets[0].data[1] = this.litrosDescarregamento;
    this.chart?.update();
  }
}
