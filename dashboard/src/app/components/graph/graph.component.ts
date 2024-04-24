import { Dataset } from '../../interfaces/dataset.interface';
import { Component, ViewChild, Input, OnChanges, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { BarChartOptionsInterface } from '../../interfaces/barChartOptions.interface';
import { Subscription, interval } from 'rxjs';

export type Chart = 'bar' | 'pie' | 'line' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'scatter';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, OnChanges, OnDestroy {
  subscription: Subscription = new Subscription();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() barChartData: Dataset = {} as Dataset;
  @Input() barChartOptions: BarChartOptionsInterface = {} as BarChartOptionsInterface;
  @Input() chartType: Chart = 'bar';

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      this.chart?.update();
    });
  }

  ngOnChanges(): void {
    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
