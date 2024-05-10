import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bateladas } from '../../interfaces/batelada.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bateladas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bateladas.component.html',
  styleUrl: './bateladas.component.scss'
})
export class BateladasComponent implements OnInit {

  bateladas: Bateladas = {};
  bateladasArray: any[] = [];
  batelada: any = {
    id: "Batelada 0",
    max: 0,
    min: 0,
    boca: '',
    total: 0
  }

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    let i = 0;
    console.log(Object.keys([this.bateladas][0]));
    for (let key in this.bateladas) {
      this.batelada = {
        id: key,
        max: this.bateladas[key].max.toFixed(2),
        min: this.bateladas[key].min.toFixed(2),
        boca: this.bateladas[key].boca,
        total: this.bateladas[key].total.toFixed(2)
      }
      this.bateladasArray.push(this.batelada);
    }
    console.log(this.bateladasArray);
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
