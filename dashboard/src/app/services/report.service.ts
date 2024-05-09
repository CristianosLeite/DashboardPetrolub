import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { ProcessoService } from './processo.service';
import { NivelService } from './nivel.service';
import { EventoService } from './evento.service';
import { Processo } from '../interfaces/processo.interface';
import { Nivel } from '../interfaces/nivel.interface';
import { PdfService, ReportType } from './pdf.service';
import { ReportData } from '../interfaces/reportData.interface';
import { Evento } from '../interfaces/evento.interface';
import { ReportOptions } from '../interfaces/reportOptions.interface';
import { AlertService } from './alert.service';

export type ProcessosNiveis = {
  processo: Processo;
  nivel: Nivel;
}

export type ProcessosEventos = {
  processo: Processo;
  eventos: Evento[];
}

export type NiveisEventos = {
  nivel: Nivel;
  eventos: Evento[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  dateRange: Date[] = [new Date(new Date(new Date().setDate(new Date().getDate() - 7))), new Date()];
  processos: Processo[] = [];
  niveis: Nivel[] = [];
  eventos: Evento[] = [];

  constructor(
    private dateService: DateService,
    private processoService: ProcessoService,
    private nivelService: NivelService,
    private eventoService: EventoService,
    private pdfService: PdfService,
    private alertService: AlertService
  ) {
    this.processoService.getProcessos();
    this.processoService.ProcessoChanged.subscribe((processos: Processo[]) => {
      this.processos = processos;
    });
    this.nivelService.getNiveis();
    this.nivelService.NiveisChanged.subscribe((niveis: Nivel[]) => {
      this.niveis = niveis;
    });
    this.eventoService.getEventos();
    this.eventoService.EventoChanged.subscribe((eventos: Evento[]) => {
      this.eventos = eventos;
    });
    this.dateService.DateChanged.subscribe((dateRange: Date[]) => {
      this.dateRange = dateRange;
    });
  }

  async generateReport(dateRange: Date[], reportOptions: ReportOptions) {
    const processos = this.processos.filter(processo => {
      const processoDate = new Date(processo.data_hora_inicio);
      return processoDate >= this.dateRange[0] && processoDate <= this.dateRange[1];
    });
    const niveis = this.niveis.filter(nivel => {
      const nivelDate = new Date(nivel.data_hora_evento);
      return nivelDate >= this.dateRange[0] && nivelDate <= this.dateRange[1];
    });
    const eventos = this.eventos.filter(evento => {
      const eventoDate = new Date(evento.data_hora_evento);
      return eventoDate >= this.dateRange[0] && eventoDate <= this.dateRange[1];
    });

    processos.forEach(processo => {
      processo.eventos = eventos.filter(evento => evento.processo_id === processo.processo_id);
    });

    const report: ReportData = {
      processos: reportOptions.cbProcessos ? processos : [],
      niveis: reportOptions.cbNiveis ? niveis : [],
      eventos: reportOptions.cbEventos ? eventos : [],
      processosNiveis: reportOptions.cbProcessosNiveis ? this.getProcessosNiveis(processos, niveis) : [],
      processosEventos: reportOptions.cbProcessosEventos ? this.getProcessosEventos(processos, eventos) : [],
      niveisEventos: reportOptions.cbNiveisEventos ? this.getNiveisEventos(niveis, eventos) : []
    }

    let reportType: ReportType = null;
    if (reportOptions.cbProcessos) {
      reportType = 'Processos';
    } else if (reportOptions.cbNiveis) {
      reportType = 'Níveis';
    } else if (reportOptions.cbEventos) {
      reportType = 'Eventos';
    }
    if (! reportType) {
      this.alertService.addAlert({ type: 'danger', message: 'Selecione pelo menos um tipo de relatório'})
      return;
    }

    this.pdfService.generatePdf(dateRange, reportType, report);
  }

  getProcessosNiveis(processos: Processo[], niveis: Nivel[]): ProcessosNiveis[] {
    return processos.map(processo => {
      const nivel = niveis.find(nivel => nivel.processo_id === processo.processo_id)!;
      return {
        processo: processo,
        nivel: nivel
      }
    });
  }

  getProcessosEventos(processos: Processo[], eventos: Evento[]): ProcessosEventos[] {
    return processos.map(processo => {
      const processoEventos = eventos.filter(evento => evento.processo_id === processo.processo_id);
      return {
        processo: processo,
        eventos: processoEventos
      }
    });
  }

  getNiveisEventos(niveis: Nivel[], eventos: Evento[]): NiveisEventos[] {
    return niveis.map(nivel => {
      const nivelEventos = eventos.filter(evento => evento.processo_id === nivel.processo_id);
      return {
        nivel: nivel,
        eventos: nivelEventos
      }
    });
  }
}
