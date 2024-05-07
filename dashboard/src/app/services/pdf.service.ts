import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ReportData } from '../interfaces/reportData.interface';

declare module "jspdf" {
  interface jsPDF {
    autoTable(content: any): jsPDF;
  }
}

export type ReportType = 'processos' | 'niveis' | 'eventos' | null;

@Injectable({
  providedIn: 'root'
})

export class PdfService {
  pdf = new jsPDF('p', 'pt', 'a4');

  constructor() { }

  generatePdf(dateRange: Date[], reportType: ReportType, data: ReportData) {
    const template = "../../assets/templatePage1.webp";
    this.pdf.addImage(template, 'JPEG', 0, 0, 595, 842);

    this.createDataHeader(dateRange, data);

    switch (reportType) {
      case 'processos':
        this.generateProcessosPdf(data);
        break;
      case 'niveis':
        console.log('niveis');
        //this.generateNiveisPdf([]);
        break;
      case 'eventos':
        console.log('eventos');
        //this.generateEventosPdf([]);
        break;
    }
    this.pdf.save(
      `Relatório de ${reportType} ${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}.pdf`
    );
  }

  createDataHeader(dateRange: Date[], data: ReportData) {
    const title = "Relatório de Processos";
    const user = localStorage.getItem('User')?.toString() ?? '';
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
      body: [...data.processos.map(processo => {
        return {
          "processo_id": processo.processo_id,
          "ticket": processo.ticket,
          "tipo_operacao": processo.tipo_operacao,
          "data_hora_inicio": processo.data_hora_inicio
            .replace('T', ' ').replace('Z', '').split('.')[0],
          "data_hora_fim": processo.data_hora_fim
            .replace('T', ' ').replace('Z', '').split('.')[0],
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
      styles: { fillColor: [29, 73, 35], fontSize: 7 }, // RGB for #1D4923
      columnStyles: {
        0: { fillColor: [255, 255, 255], fontSize: 7 },
        1: { fillColor: [255, 255, 255], fontSize: 7 },
        2: { fillColor: [255, 255, 255], fontSize: 7 },
        3: { fillColor: [255, 255, 255], fontSize: 7 },
        4: { fillColor: [255, 255, 255], fontSize: 7 },
        5: { fillColor: [255, 255, 255], fontSize: 7 },
        6: { fillColor: [255, 255, 255], fontSize: 7 },
        7: { fillColor: [255, 255, 255], fontSize: 7 },
        8: { fillColor: [255, 255, 255], fontSize: 7 },
        9: { fillColor: [255, 255, 255], fontSize: 7 },
        10: { fillColor: [255, 255, 255], fontSize: 7 },
        11: { fillColor: [255, 255, 255], fontSize: 7 }
      }
    });
  }
}
