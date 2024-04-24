type DataOptions = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  tension?: number;
  fill?: boolean;
};

export interface Dataset {
  labels: string[];
  datasets: DataOptions[];
}
