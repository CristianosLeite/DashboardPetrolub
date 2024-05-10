export interface Batelada {
  max: number;
  min: number;
  boca: string;
  total: number;
}

export interface Bateladas {
  [key: string]: Batelada;
}
