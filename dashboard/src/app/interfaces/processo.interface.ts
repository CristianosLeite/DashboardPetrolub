import { Batelada } from "./batelada.interface";
import { Evento } from "./eventos.interface";

export interface Processo {
  processo_id: number;
  ticket: string | null;
  tipo_operacao: string;
  data_hora_inicio: string;
  data_hora_fim: string;
  operador: string;
  motorista: string;
  placa: string;
  qnt_litros_informado: number;
  bateladas: Batelada[] | {};
  total_litros_processo: number;
  eventos : Evento[];
}
