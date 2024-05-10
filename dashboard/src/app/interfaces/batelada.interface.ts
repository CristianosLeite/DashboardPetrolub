export interface Batelada {
  id: string;
  max: number;
  min: number;
  boca: string;
  total: number;
}

export interface Bateladas {
  [key: string]: Omit<Batelada, 'id'>;
}
