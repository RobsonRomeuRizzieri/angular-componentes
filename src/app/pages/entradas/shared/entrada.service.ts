import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service"

import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";

import { Entrada } from "./entrada.model";
import { CategoriasService } from "../../categorias/shared/categorias.service"

@Injectable({
  providedIn: 'root'
})
export class EntradaService extends BaseResourceService<Entrada>{

  //private apiPath: string = "api/entradas";
  constructor(
    protected injector: Injector,
    private categoriaService: CategoriasService
    ) { 
    super("api/entradas", injector, Entrada.fromJson);
  }

//  constructor(
//    private http: HttpClient,
//    private categoriaService: CategoriasService
//  ) { }
  create(entrada: Entrada): Observable<Entrada>{
    //entrada.categoriaId // vai conter o id
    //entrada.categoria // vai ser igual a null
    //precisamos fazer a relação manualmente
    //flatMap agrupa os dois observable
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria
        //Já retorna um observable da entrada
        return super.create(entrada);      
      })
    )    
  }

  update(entrada: Entrada): Observable<Entrada> {    

    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria
        return super.update(entrada);
      })
    )
  }
}
