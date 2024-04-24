import { Component, OnInit, OnChanges, OnDestroy, NgZone, ViewChild } from '@angular/core';
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
  dateRange: Date[] = [new Date(new Date(new Date().setDate(new Date().getDate() - 7))), new Date()];

  constructor(private processoService: ProcessoService, private ngZone: NgZone, private dateService: DateService) {
    this.dateService.DateChanged.subscribe((dateRange: Date[]) => {
      this.dateRange = dateRange;
    });
  }

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
    this.subscription = interval(1000).subscribe(() => {
      this.ngZone.run(async () => {
        this.setData(this.dateRange[0], this.dateRange[1]);
      });
    });
  }

  ngOnChanges(): void {
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async setData(startDate: Date, endDate: Date) {
    await this.processoService.getProcessos().then((processos) => {
      this.processos = processos;
      this.litrosDescarregamento = 0;
      this.litrosCarregamento = 0;
      processos.forEach((processo) => {
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
    });
  }
}
