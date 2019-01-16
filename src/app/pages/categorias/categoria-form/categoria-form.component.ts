import { Component, Injector } from '@angular/core';
import { Validators} from "@angular/forms";

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component"
import { Categorias } from "../shared/categorias.model";
import { CategoriasService } from "../shared/categorias.service";

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends BaseResourceFormComponent<Categorias> {

  constructor(
    protected categoriaService: CategoriasService,
    protected injector: Injector
  ) { 
    super(injector, new Categorias(), categoriaService, Categorias.fromJson)
  }

  //Implementação especifica para o formulário de categoria
  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }
  //Soprepondo a definição dos títulos
  protected criarTituloPagina(): string {
    return "Cadastro de nova categoria"
  }
  //Soprepondo definição dos títulos
  protected alterarTituloPagina(): string {
    //Tratamento para não dar undefinede
    const categoriaNome = this.resource.nome || "";
    return "Alterando categoria: " + categoriaNome;
  }
}
