import { Component, OnInit } from '@angular/core';

import { Entrada } from "../shared/entrada.model";
import { EntradaService } from "../shared/entrada.service";
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-entrada-list',
  templateUrl: './entrada-list.component.html',
  styleUrls: ['./entrada-list.component.css']
})
export class EntradaListComponent implements OnInit {

  entradas: Entrada[] = [];

  constructor(private entradaService: EntradaService) { }

  ngOnInit() {
    this.entradaService.getAll().subscribe(
      entradaRetorno => this.entradas = entradaRetorno.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')      
    )
  }

  deletarEntrada(entrada){
    const excluir = confirm('Deseja realmente excluir este item?');

    if (excluir){
      this.entradaService.delete(entrada.id).subscribe(
        () => this.entradas = this.entradas.filter(element => element != entrada),
        () => alert("Erro ao tentar excluir")    
      )
    }
  }
  
}
