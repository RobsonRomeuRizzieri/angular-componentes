import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Categorias } from "./categorias.model";
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiPath: string = "api/categorias";

  constructor(
    private http: HttpClient
  ) { }

  getAll():
    Observable<Categorias[]>{
      return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories)
      )  
  }

  getById(id: number): Observable<Categorias>{
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError), 
      map(this.jsonDataToCategoria)
    )
  }

  create(categoria: Categorias): Observable<Categorias>{
    return this.http.post(this.apiPath, categoria).pipe(
      catchError(this.handleError), 
      map(this.jsonDataToCategoria)
    )
  }

  update(categoria: Categorias): Observable<Categorias> {
    const url = `${this.apiPath}/${categoria.id}`;

    return this.http.put(url, categoria).pipe(
      catchError(this.handleError), 
      map(() => categoria)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError), 
      map(() => null)
    )
  }

  private jsonDataToCategoria(jsonData: any): Categorias{
    return jsonData as Categorias;
  }

  private jsonDataToCategories(jsonData: any[]): Categorias[]{
    const categorias: Categorias[] = [];
    jsonData.forEach(element => categorias.push(element as Categorias));
    return categorias;
  } 

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }
}
