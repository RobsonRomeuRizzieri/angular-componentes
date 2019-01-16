import { Component } from '@angular/core';

import { BaseresourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component"

import { Categorias } from "../shared/categorias.model";
import { CategoriasService } from "../shared/categorias.service";

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent extends BaseresourceListComponent<Categorias> {

  constructor(private categoriaService: CategoriasService) { 
    super(categoriaService);
  }

}
