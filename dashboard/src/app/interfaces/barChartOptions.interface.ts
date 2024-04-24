export interface BarChartOptionsInterface {
  responsive: boolean;
  scales: {
    x: {
      display: boolean;
      title: {
        display: boolean;
        text: string;
      }
    },
    y: {
      display: boolean;
      title: {
        display: boolean;
        text: string;
      }
    }
  };
  maintainAspectRatio: boolean;
}
