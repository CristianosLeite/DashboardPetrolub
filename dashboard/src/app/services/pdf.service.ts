import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ReportData } from '../interfaces/reportData.interface';
import { AuthService } from './auth.service';

declare module "jspdf" {
  interface jsPDF {
    autoTable(content: any): jsPDF;
  }
}

export type ReportType = 'Processos' | 'Níveis' | 'Eventos' | null;

@Injectable({
  providedIn: 'root'
})

export class PdfService {
  user = this.auth.authenticatedUser;
  pdf = new jsPDF('p', 'pt', 'a4');
  headerStyle = { fillColor: [29, 73, 35], fontSize: 7 }; // RGB for #1D4923
  columnStyle = { fillColor: [255, 255, 255], fontSize: 7 };

  constructor(private auth: AuthService) {
    this.auth.userChanged.subscribe((user) => {
      this.user = user;
    });
  }

  generatePdf(dateRange: Date[], reportType: ReportType, data: ReportData) {
    this.pdf = new jsPDF('p', 'pt', 'a4');
    const template = "../../assets/templatePage1.webp";
    this.pdf.addImage(template, 'JPEG', 0, 0, 595, 842);

    this.createDataHeader(reportType, dateRange, data);

    this.generateReport(reportType, data);

    if (this.hasData(data))
      this.pdf.save(
        `Relatório de ${reportType} ${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}.pdf`
      );
  }

  private generateReport(reportType: ReportType, data: ReportData) {
    switch (reportType) {
      case 'Processos':
        this.generateProcessosPdf(data);
        break;
      case 'Níveis':
        this.generateNiveisPdf(data);
        break;
      case 'Eventos':
        this.generateEventosPdf(data);
        break;
      default:
        this.generateProcessosPdf(data);
        break;
    }
  }

  private hasData(data: ReportData) {
    return data.processos.length > 0 || data.niveis.length > 0 || data.eventos.length > 0;
  }

  private generateColumnStyles(columns: number, style: { fillColor: number[], fontSize: number }) {
    let columnStyles: any = {};
    for (let i = 0; i < columns; i++) {
      columnStyles[i] = style;
    }
    return columnStyles;
  }

  createDataHeader( reportType: ReportType, dateRange: Date[], data: ReportData) {
    const title = `Relatório de ${reportType}`;
    const user = this.user;
    const litrosDescarregamento = data.processos
      .filter(processo => processo.tipo_operacao === 'DESCARREGAMENTO')
      .map(processo => processo.total_litros_processo)
      .reduce((a, b) => a + b, 0);
    const litrosCarregamento = Object.values(data)
      .filter(processo => processo.tipo_operacao === 'CARREGAMENTO')
      .map(processo => processo.total_litros_processo)
      .reduce((a, b) => a + b, 0);

    this.pdf.setFontSize(28);
    this.pdf.setFont("times", "bold");
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.text(title, 180, 40);

    this.pdf.setFontSize(12);
    this.pdf.setFont("times", "normal");
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text("Período selecionado: " +
      dateRange[0].toLocaleDateString() + " - " +
      dateRange[1].toLocaleDateString(), 15, 70);
    this.pdf.text("Data/Hora emissão: " +
      new Date().toLocaleDateString() + " - " +
      new Date().toLocaleTimeString(), 15, 90);
    this.pdf.text("Emitido por: " + user, 15, 110);

    this.pdf.text("Total de processos: " +
      data.processos.length.toString(), 300, 70);
    this.pdf.text("Total de litros Decarregamento: " +
      litrosDescarregamento.toFixed(2).toString(), 300, 90);
    this.pdf.text("Total de litros Carregamento: " +
      litrosCarregamento.toFixed(2).toString(), 300, 110);
  }

  generateProcessosPdf(data: ReportData) {
    if (data.processos.length === 0) {
      alert('Nenhum processo encontrado no período selecionado');
      return;
    }

    const columnStyles = this.generateColumnStyles(12, this.columnStyle);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 150,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Id", dataKey: Object.keys(data.processos[0])[0].toString() },
        { title: "Ticket", dataKey: Object.keys(data.processos[0])[1].toString() },
        { title: "Tipo de Operação", dataKey: Object.keys(data.processos[0])[2].toString() },
        { title: "Início", dataKey: Object.keys(data.processos[0])[3].toString() },
        { title: "Fim", dataKey: Object.keys(data.processos[0])[4].toString() },
        { title: "Operador", dataKey: Object.keys(data.processos[0])[5].toString() },
        { title: "Motorista", dataKey: Object.keys(data.processos[0])[6].toString() },
        { title: "Placa", dataKey: Object.keys(data.processos[0])[7].toString() },
        { title: "Total Litros Informado", dataKey: Object.keys(data.processos[0])[8].toString() },
        { title: "Bateladas", dataKey: Object.keys(data.processos[0])[9].toString() },
        { title: "Total Litros Processo", dataKey: Object.keys(data.processos[0])[10].toString() },
        { title: "Eventos", dataKey: Object.keys(data.processos[0])[11].toString() }
      ],
      body: [
        ...data.processos.map(processo => {
          return {
            "processo_id": processo.processo_id,
            "ticket": processo.ticket,
            "tipo_operacao": processo.tipo_operacao,
            "data_hora_inicio": new Date(processo.data_hora_inicio).toLocaleString(),
            "data_hora_fim": new Date(processo.data_hora_fim).toLocaleString(),
            "operador": processo.operador,
            "motorista": processo.motorista,
            "placa": processo.placa,
            "qnt_litros_informado": processo.qnt_litros_informado,
            "bateladas": Object.keys(processo.bateladas).length,
            "total_litros_processo": processo.total_litros_processo,
            "eventos": processo.eventos.length
          }
        })
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });

    if (data.processosNiveis.length > 0) {
      this.addProcessosNiveis(data);
    }

    if (data.processosEventos.length > 0) {
      this.addProcessosEventos(data);
    }

    if (data.niveisEventos.length > 0) {
      this.addNiveisEventos(data);
    }
  }

  generateNiveisPdf(data: ReportData) {
    if (data.niveis.length === 0) {
      alert('Nenhum nível encontrado no período selecionado');
      return;
    }

    const columnStyles = this.generateColumnStyles(8, this.columnStyle);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 150,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Id", dataKey: Object.keys(data.niveis[0])[0].toString() },
        { title: "Tq Medição 1", dataKey: Object.keys(data.niveis[0])[3].toString() },
        { title: "Tq Medição 2", dataKey: Object.keys(data.niveis[0])[4].toString() },
        { title: "Tq Armazenamento 1", dataKey: Object.keys(data.niveis[0])[5].toString() },
        { title: "Tq Armazenamento 2", dataKey: Object.keys(data.niveis[0])[6].toString() },
        { title: "Tq Armazenamento 3", dataKey: Object.keys(data.niveis[0])[7].toString() },
        { title: "Tq Armazenamento 4", dataKey: Object.keys(data.niveis[0])[8].toString() },
        { title: "Data/Hora", dataKey: Object.keys(data.niveis[0])[9].toString() },
      ],
      body: [
        ...data.niveis.map(nivel => {
          return {
            "nivel_id": nivel.nivel_id,
            "nivel_tq_med_1": nivel.nivel_tq_med_1,
            "nivel_tq_med_2": nivel.nivel_tq_med_2,
            "nivel_tq_arm_1": nivel.nivel_tq_arm_1,
            "nivel_tq_arm_2": nivel.nivel_tq_arm_2,
            "nivel_tq_arm_3": nivel.nivel_tq_arm_3,
            "nivel_tq_arm_4": nivel.nivel_tq_arm_4,
            "data_hora_evento": new Date(nivel.data_hora_evento).toLocaleString()
          }
        })
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });

    if (data.processosNiveis.length > 0) {
      this.addProcessosNiveis(data);
    }

    if (data.processosEventos.length > 0) {
      this.addProcessosEventos(data);
    }

    if (data.niveisEventos.length > 0) {
      this.addNiveisEventos(data);
    }
  }

  generateEventosPdf(data: ReportData) {
    if (data.eventos.length === 0) {
      alert('Nenhum evento encontrado no período selecionado');
      return;
    }

    const columnStyles = this.generateColumnStyles(5, this.columnStyle);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 150,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Id", dataKey: Object.keys(data.eventos[0])[0].toString() },
        { title: "Processo", dataKey: Object.keys(data.eventos[0])[1].toString() },
        { title: "Evento", dataKey: Object.keys(data.eventos[0])[2].toString() },
        { title: "Status", dataKey: Object.keys(data.eventos[0])[3].toString()},
        { title: "Data/Hora", dataKey: Object.keys(data.eventos[0])[4].toString() },
      ],
      body: [
        ...data.eventos.map(evento => {
          return {
            "evento_id": evento.evento_id,
            "processo_id": evento.processo_id,
            "evento": evento.evento,
            "status": evento.status,
            "data_hora_evento": new Date(evento.data_hora_evento).toLocaleString()
          }
        })
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });

    if (data.processosNiveis.length > 0) {
      this.addProcessosNiveis(data);
    }

    if (data.processosEventos.length > 0) {
      this.addProcessosEventos(data);
    }

    if (data.niveisEventos.length > 0) {
      this.addNiveisEventos(data);
    }
  }

  addProcessosNiveis(data: ReportData) {
    const template = "../../assets/template.webp";
    const title = "Processos x Níveis";
    const description = "Detalhamento do nível dos tanques no início de cada processo:";
    const columnStyles = this.generateColumnStyles(7, this.columnStyle);

    this.pdf.addPage();
    this.pdf.addImage(template, 'JPEG', 0, 0, 595, 842);
    this.pdf.setFontSize(28);
    this.pdf.setFont("times", "bold");
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.text(title, 180, 40);
    this.pdf.setFontSize(14);
    this.pdf.setFont("times", "normal");
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(description, 15, 80);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 100,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Processo", dataKey: 'processo_id' },
        { title: "Tq Medição 1", dataKey: 'nivel_tq_med_1' },
        { title: "Tq Medição 2", dataKey: 'nivel_tq_med_2' },
        { title: "Tq Armazenamento 1", dataKey: 'nivel_tq_arm_1' },
        { title: "Tq Armazenamento 2", dataKey: 'nivel_tq_arm_2' },
        { title: "Tq Armazenamento 3", dataKey: 'nivel_tq_arm_3' },
        { title: "Tq Armazenamento 4", dataKey: 'nivel_tq_arm_4' }
      ],
      body: [
        ...data.processosNiveis.map(processoNivel => {
          return {
            "processo_id": processoNivel.nivel.processo_id,
            "nivel_tq_med_1": processoNivel.nivel.nivel_tq_med_1,
            "nivel_tq_med_2": processoNivel.nivel.nivel_tq_med_2,
            "nivel_tq_arm_1": processoNivel.nivel.nivel_tq_arm_1,
            "nivel_tq_arm_2": processoNivel.nivel.nivel_tq_arm_2,
            "nivel_tq_arm_3": processoNivel.nivel.nivel_tq_arm_3,
            "nivel_tq_arm_4": processoNivel.nivel.nivel_tq_arm_4
          }
        })
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });
  }

  addProcessosEventos(data: ReportData) {
    const template = "../../assets/template.webp";
    const title = "Processos x Eventos";
    const description = "Detalhamento dos eventos de cada processo:";
    const columnStyles = this.generateColumnStyles(4, this.columnStyle);

    this.pdf.addPage();
    this.pdf.addImage(template, 'JPEG', 0, 0, 595, 842);
    this.pdf.setFontSize(28);
    this.pdf.setFont("times", "bold");
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.text(title, 180, 40);
    this.pdf.setFontSize(14);
    this.pdf.setFont("times", "normal");
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(description, 15, 80);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 100,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Processo", dataKey: "processo_id" },
        { title: "Evento", dataKey: "evento" },
        { title: "status", dataKey: "status" },
        { title: "Data/Hora", dataKey: "data_hora" }
      ],
      body: [
        ...data.processosEventos.map(processoEvento => {
          return processoEvento.eventos.map(evento => {
            return {
              "processo_id": processoEvento.processo.processo_id,
              "evento": evento.evento,
              "status": evento.status,
              "data_hora": new Date(evento.data_hora_evento).toLocaleString()
            }
          })
        }).flat()
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });
  }

  addNiveisEventos(data: ReportData) {
    const template = "../../assets/template.webp";
    const title = "Níveis x Eventos";
    const description = "Detalhamento do nível dos tanques por evento:";
    const columnStyles = this.generateColumnStyles(8, this.columnStyle);

    this.pdf.addPage();
    this.pdf.addImage(template, 'JPEG', 0, 0, 595, 842);
    this.pdf.setFontSize(28);
    this.pdf.setFont("times", "bold");
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.text(title, 180, 40);
    this.pdf.setFontSize(14);
    this.pdf.setFont("times", "normal");
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(description, 15, 80);

    this.pdf.autoTable({
      tableWidth: 'auto',
      startY: 100,
      margin: { top: 50, right: 15, bottom: 50, left: 15 },
      columns: [
        { title: "Evento", dataKey: 'evento' },
        { title: "Tq Medição 1", dataKey: 'nivel_tq_med_1' },
        { title: "Tq Medição 2", dataKey: 'nivel_tq_med_2' },
        { title: "Tq Armazenamento 1", dataKey: 'nivel_tq_arm_1' },
        { title: "Tq Armazenamento 2", dataKey: 'nivel_tq_arm_2' },
        { title: "Tq Armazenamento 3", dataKey: 'nivel_tq_arm_3' },
        { title: "Tq Armazenamento 4", dataKey: 'nivel_tq_arm_4' },
        { title: "Data/Hora", dataKey: 'data_hora_evento' }
      ],
      body: [
        ...data.niveisEventos.map(nivelEvento => {
          return {
            "evento": nivelEvento.nivel.evento.evento,
            "nivel_tq_med_1": nivelEvento.nivel.nivel_tq_med_1,
            "nivel_tq_med_2": nivelEvento.nivel.nivel_tq_med_2,
            "nivel_tq_arm_1": nivelEvento.nivel.nivel_tq_arm_1,
            "nivel_tq_arm_2": nivelEvento.nivel.nivel_tq_arm_2,
            "nivel_tq_arm_3": nivelEvento.nivel.nivel_tq_arm_3,
            "nivel_tq_arm_4": nivelEvento.nivel.nivel_tq_arm_4,
            "data_hora_evento": new Date(nivelEvento.nivel.data_hora_evento).toLocaleString()
          }
        })
      ],
      styles: this.headerStyle,
      columnStyles: columnStyles
    });
  }
}
