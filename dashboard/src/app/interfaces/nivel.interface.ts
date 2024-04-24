import { Evento } from "./eventos.interface";

export interface Nivel {
  0:
  {
    nivel_id: number;
    processo_id: number;
    evento_id: number;
    nivel_tq_med_1: number;
    nivel_tq_med_2: number;
    nivel_tq_arm_1: number;
    nivel_tq_arm_2: number;
    nivel_tq_arm_3: number;
    nivel_tq_arm_4: number;
    data_hora_evento: string;
    evento: Evento;
  }
}
