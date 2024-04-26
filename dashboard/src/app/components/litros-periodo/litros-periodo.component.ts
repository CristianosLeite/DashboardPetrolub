import { Component, OnInit, OnChanges, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { Subscription, interval } from 'rxjs';
import { Processo } from '../../interfaces/processo.interface';
import { Dataset } from '../../interfaces/dataset.interface';
import { BarChartOptionsInterface } from '../../interfaces/barChartOptions.interface';
import { BaseChartDirective } from 'ng2-charts';
import { GraphComponent } from '../graph/graph.component';
import { DateService } from '../../services/date.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-litros-periodo',
  standalone: true,
  imports: [BaseChartDirective, GraphComponent],
  templateUrl: './litros-periodo.component.html',
  styleUrl: './litros-periodo.component.scss'
})
export class LitrosPeriodoComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription = new Subscription();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  dateRange: Date[] = [new Date((new Date().setDate(new Date().getDate() - 8))), new Date()];

  constructor(private processoService: ProcessoService, private ngZone: NgZone, private dateService: DateService, private loadingService: LoadingService) {
    this.dateService.DateChanged.subscribe((dateRange: Date[]) => {
      this.dateRange = dateRange;
    });
  }

  processos = [] as Processo[];
  litrosCarregamento: number[] = [0, 0, 0, 0, 0, 0, 0];
  litrosDescarregamento: number[] = [0, 0, 0, 0, 0, 0, 0];

  dataset: Dataset = {
    labels: [
      this.dateRange[0].toLocaleDateString(),
      this.dateRange[1].toLocaleDateString(),
    ],
    datasets: [
      {
        label: 'Total de litros descarregados no período',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: ['rgb(75, 192, 192)'],
        backgroundColor: ['rgb(75, 192, 192)'],
        borderWidth: 1,
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Total de litros carregados no período',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: ['rgb(192, 75, 75)'],
        backgroundColor: ['rgb(192, 75, 75)'],
        borderWidth: 1.5,
        tension: 0.1,
        fill: false,
      }
    ]
  };

  chartOptions: BarChartOptionsInterface = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Período'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Volume'
        }
      }
    },
    maintainAspectRatio: true,
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.processoService.ProcessoChanged.subscribe((processos) => {
      this.processos = processos;
      this.ngZone.run(() => {
        this.setData();
      });
      this.setDatasetLabels();
    });
    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 2000);
  }

  setData() {
    const dateToIndex = new Map<string, number>();
    this.dataset.labels.forEach((date, index) => {
      dateToIndex.set(date, index);
    });
    this.litrosDescarregamento = new Array(this.dataset.labels.length).fill(0);
    this.litrosCarregamento = new Array(this.dataset.labels.length).fill(0);
    this.processos.forEach((processo) => {
      const date = new Date(processo.data_hora_inicio).toLocaleDateString();
      if (dateToIndex.has(date)) {
        const index: number = dateToIndex.get(date)?.valueOf() as number;
        if (processo.tipo_operacao === 'DESCARREGAMENTO') {
          this.litrosDescarregamento[index] += processo.total_litros_processo;
        } else if (processo.tipo_operacao === 'CARREGAMENTO') {
          this.litrosCarregamento[index] += processo.total_litros_processo;
        }
      }
    });
    this.dataset.datasets[0].data = this.litrosDescarregamento;
    this.dataset.datasets[1].data = this.litrosCarregamento;
    this.chart?.update();
  }

  setDatasetLabels(): void {
    const uniqueDates = new Set<string>();
    this.processos.forEach(element => {
      const date = new Date(element.data_hora_inicio);
      if (date >= this.dateRange[0] && date <= this.dateRange[1]) {
        uniqueDates.add(date.toLocaleDateString());
      }
    });
    this.dataset.labels = Array.from(uniqueDates);
  }

  ngOnChanges(): void {
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
