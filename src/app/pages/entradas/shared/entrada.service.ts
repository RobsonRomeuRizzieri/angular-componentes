import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service"

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

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
    super("api/entradas", injector);
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
        return this.http.post(this.apiPath, entrada).pipe(
          catchError(this.handleError), 
          map(this.jsonDataToResource)
        )        
      })
    )    
  }

  update(entrada: Entrada): Observable<Entrada> {
    const url = `${this.apiPath}/${entrada.id}`;

    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria
        return this.http.put(url, entrada).pipe(
          catchError(this.handleError), 
          map(() => entrada)
        )        
      })
    )
  }

  //Sobrepondo o método da classe base
  protected jsonDataToResource(jsonData: any): Entrada{
    return  Object.assign(new Entrada(), jsonData);
  }

  //Sobrepondo o método da classe base
  protected jsonDataToResources(jsonData: any[]): Entrada[]{
    //array do tipo Entrada
    const entradas: Entrada[] = [];
    jsonData.forEach(element => {
      //montando um array com objetos do tipo entrada 
      const entrada = Object.assign(new Entrada(), element)
      //Adicionar ao array
      entradas.push(entrada);
    });
      
    return entradas;
  } 

}
