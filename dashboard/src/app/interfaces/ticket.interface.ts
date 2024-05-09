export interface Ticket {
  id: number;
  branch: string;
  description: string;
  status: 'Ativo' | 'Inativo';
  operation: string;
  driver: string;
  plate: string;
  volume: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}
