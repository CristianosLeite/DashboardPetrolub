import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bateladas } from '../../interfaces/batelada.interface';
import { Batelada } from '../../interfaces/batelada.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bateladas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bateladas.component.html',
  styleUrl: './bateladas.component.scss'
})
export class BateladasComponent implements OnInit {

  bateladasArray: Batelada[] = [];
  bateladas: Bateladas = {};
  batelada: Batelada = {
    id: "Batelada 0",
    max: 0,
    min: 0,
    boca: '',
    total: 0
  }

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    for (let key in this.bateladas) {
      this.batelada = {
        id: key,
        max: Number(this.bateladas[key].max.toFixed(2)),
        min: Number(this.bateladas[key].min.toFixed(2)),
        boca: this.bateladas[key].boca,
        total: Number(this.bateladas[key].total.toFixed(2))
      }
      this.bateladasArray.push(this.batelada);
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
