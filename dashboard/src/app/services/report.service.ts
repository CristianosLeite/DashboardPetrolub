import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { ProcessoService } from './processo.service';
import { NivelService } from './nivel.service';
import { Processo } from '../interfaces/processo.interface';
import { Nivel } from '../interfaces/nivel.interface';
import { PdfService, ReportType } from './pdf.service';
import { ReportData } from '../interfaces/reportData.interface';
import { Evento } from '../interfaces/evento.interface';
import { ReportOptions } from '../interfaces/reportOptions.interface';

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

  constructor(
    private dateService: DateService,
    private processoService: ProcessoService,
    private nivelService: NivelService,
    private pdfService: PdfService
  ) {
    this.processoService.getProcessos();
    this.processoService.ProcessoChanged.subscribe((processos: Processo[]) => {
      this.processos = processos;
    });
    this.nivelService.getNiveis();
    this.nivelService.NiveisChanged.subscribe((niveis: Nivel[]) => {
      this.niveis = niveis;
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
    const niveis = this.niveis;

    const report: ReportData = {
      processos: reportOptions.cbProcessos ? processos : [],
      niveis: reportOptions.cbNiveis ? niveis : [],
      eventos: reportOptions.cbEventos ? [] : [],
      processosNiveis: reportOptions.cbProcessosNiveis ? this.getProcessosNiveis(processos, niveis) : [],
      processosEventos: reportOptions.cbProcessosEventos ? this.getProcessosEventos(processos) : [],
      niveisEventos: reportOptions.cbNiveisEventos ? this.getNiveisEventos(niveis) : []
    }

    let reportType: ReportType = null;
    if (reportOptions.cbProcessos) {
      reportType = 'processos';
    } else if (reportOptions.cbNiveis) {
      reportType = 'niveis';
    } else if (reportOptions.cbEventos) {
      reportType = 'eventos';
    }
    if (! reportType) {
      alert('Selecione um tipo de relatório para gerar');
      return;
    }

    console.log(report);
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

  getProcessosEventos(processos: Processo[]): ProcessosEventos[] {
    return processos.map(processo => {
      return {
        processo: processo,
        eventos: []
      }
    });
  }

  getNiveisEventos(niveis: Nivel[]): NiveisEventos[] {
    return niveis.map(nivel => {
      return {
        nivel: nivel,
        eventos: []
      }
    });
  }
}
