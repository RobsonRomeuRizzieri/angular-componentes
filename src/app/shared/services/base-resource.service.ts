import { HttpClient} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { BaseResourceModel } from "../models/base-resource.model";
import { Injector } from "@angular/core";

//Está informando que dentro de T já existe o conteudo do BaseResourceModel
//assim é possível por exemplo ter acesso ao atributo id
export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath:string,
        protected injector: Injector
    ){
        //Obtem uma instância existente de HttpClient para ser injetda na variável
        //Fazendo isso não precisa obter o HttpClient basta somente passar o inject no construtor
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]>{
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResources)
        )  
    }

    getById(id: number): Observable<T>{
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
        catchError(this.handleError), 
        map(this.jsonDataToResource)
        )
    }

    create(resource: T): Observable<T>{
        return this.http.post(this.apiPath, resource).pipe(
        catchError(this.handleError), 
        map(this.jsonDataToResource)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
        catchError(this.handleError), 
        map(() => resource)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
        catchError(this.handleError), 
        map(() => null)
        )
    }
    //protected permite a classe que herdam da classe ter acesso aos métodos
    protected jsonDataToResource(jsonData: any): T{
        return jsonData as T;
    }

    protected jsonDataToResources(jsonData: any[]): T[]{
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(element as T));
        return resources;
    } 

    protected handleError(error: any): Observable<any>{
        console.log("Erro na requisição => ", error);
        return throwError(error);
    }  
}