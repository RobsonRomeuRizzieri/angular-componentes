import { Component, OnInit } from '@angular/core';

import { Categorias } from "../shared/categorias.model";
import { CategoriasService } from "../shared/categorias.service";
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categorias: Categorias[] = [];

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categoriasRetorno => this.categorias = categoriasRetorno,
      error => alert('Erro ao carregar a lista')      
    )
  }

  deletarCategoria(categoria){
    const excluir = confirm('Deseja realmente excluir este item?');

    if (excluir){
      this.categoriaService.delete(categoria.id).subscribe(
        () => this.categorias = this.categorias.filter(element => element != categoria),
        () => alert("Erro ao tentar excluir")    
      )
    }
  }
  
}
