import { Processo } from './processo.interface';
import { Nivel } from './nivel.interface';
import { Evento } from './evento.interface';
import { ProcessosNiveis, ProcessosEventos, NiveisEventos } from '../services/report.service';

export interface ReportData {
  processos: Processo[],
  niveis: Nivel[],
  eventos: Evento[],
  processosNiveis: ProcessosNiveis[]
  processosEventos: ProcessosEventos[],
  niveisEventos: NiveisEventos[]
};
