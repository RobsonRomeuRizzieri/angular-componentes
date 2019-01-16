import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/services/base-resource.service"

import { Observable } from "rxjs";
import { flatMap, catchError, map } from "rxjs/operators";

import { Entrada } from "./entrada.model";
import { CategoriasService } from "../../categorias/shared/categorias.service"

import * as moment from "moment";

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
    return this.setCategoriaAndSendToServer(entrada, super.create.bind(this))
  }

  update(entrada: Entrada): Observable<Entrada> {    
    return this.setCategoriaAndSendToServer(entrada, super.update.bind(this))
  }

  getByMonthAndYear(month: number, year: number): Observable<Entrada[]>{
    //Exemplo de busca com filtro no servidor
    //this.http.get("api/entradas?month=month&year=ano").subscribe(
    //  ...
    //)
    //Vamos filtrar na mão porque não temos o servidor para filtrar para nós
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }
  //sendFn recebe como paramentro a função que vai fazer o envio dos dados
  private setCategoriaAndSendToServer(entrada: Entrada, sendFn: any): Observable<Entrada> {
    //entrada.categoriaId // vai conter o id
    //entrada.categoria // vai ser igual a null
    //precisamos fazer a relação manualmente
    //flatMap agrupa os dois observable
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
        entrada.categoria = categoria
        //Já retorna um observable da entrada
        return sendFn(entrada);      
      }),
      catchError(this.handleError)
    )     
  }

  private filterByMonthAndYear(entrada: Entrada[], month: number, year: number){
    //aplicando filtro no cliente porque não temos como filtrar no servidor
    return entrada.filter(
      entrada => {
        const entradaDate = moment(entrada.data, "DD/MM/YYYY")
        const monthMatches = entradaDate.month() + 1 == month;
        const yearMatches = entradaDate.year() == year;
        if (monthMatches && yearMatches)
          return entrada;
      }
    )
  }
}
