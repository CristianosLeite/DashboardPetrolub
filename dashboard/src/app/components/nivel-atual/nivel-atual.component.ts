import { Component, OnInit, OnChanges, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { NivelService } from '../../services/nivel.service';
import { Subscription, interval } from 'rxjs';
import { Dataset } from '../../interfaces/dataset.interface';
import { BarChartOptionsInterface } from '../../interfaces/barChartOptions.interface';
import { BaseChartDirective } from 'ng2-charts';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-nivel-atual',
  standalone: true,
  imports: [BaseChartDirective, GraphComponent],
  templateUrl: './nivel-atual.component.html',
  styleUrl: './nivel-atual.component.scss'
})
export class NivelAtualComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  dataset: Dataset = {
    labels: ['Tanque Medição 1', 'Tanque Medição 2', 'Tanque Armazenamento 1', 'Tanque Armazenamento 2', 'Tanque Armazenamento 3', 'Tanque Armazenamento 4'],
    datasets: [
      {
        label: 'Nível dos tanques (última leitura)',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
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
        display: true,
        title: {
          display: true,
          text: 'Tanques'
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

  constructor(private nivelService: NivelService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.nivelService.getLastNivel();
    this.nivelService.LastNivelChanged.subscribe(nivel => {
      this.dataset.datasets[0].data = [nivel[0].nivel_tq_med_1, nivel[0].nivel_tq_med_2, nivel[0].nivel_tq_arm_1, nivel[0].nivel_tq_arm_2, nivel[0].nivel_tq_arm_3, nivel[0].nivel_tq_arm_4];
    });
    this.subscription.add(interval(60000).subscribe(() => {
      this.nivelService.getLastNivel();
      this.updateChart();
    }));
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateChart() {
    this.ngZone.run(() => {
      this.chart?.update();
    });
  }
}
