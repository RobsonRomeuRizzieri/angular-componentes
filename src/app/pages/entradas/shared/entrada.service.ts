import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Entrada } from "./entrada.model";
import { CategoriasService } from "../../categorias/shared/categorias.service"
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiPath: string = "api/entradas";

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriasService
  ) { }

  getAll():
    Observable<Entrada[]>{
      return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntradas)
      )  
  }

  getById(id: number): Observable<Entrada>{
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError), 
      map(this.jsonDataToEntrada)
    )
  }

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
          map(this.jsonDataToEntrada)
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

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError), 
      map(() => null)
    )
  }

  private jsonDataToEntrada(jsonData: any): Entrada{
    return  Object.assign(new Entrada(), jsonData);
  }

  private jsonDataToEntradas(jsonData: any[]): Entrada[]{
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

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }
}
