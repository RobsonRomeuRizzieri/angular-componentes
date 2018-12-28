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
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ){
        //Obtem uma instância existente de HttpClient para ser injetda na variável
        //Fazendo isso não precisa obter o HttpClient basta somente passar o inject no construtor
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]>{
        return this.http.get(this.apiPath).pipe(
            //Executando a função
            //map((jsonData: Array<any>) => this.jsonDataToResources(jsonData)),
            //é uma função atribuida como parametro
            //map(this.jsonDataToResources),
            //Está definindo qual o this deve ser executado
            //nesse caso o this da própria classe
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)            
        )  
    }

    getById(id: number): Observable<T>{
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)         
        )
    }

    create(resource: T): Observable<T>{
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)         
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;

        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)        
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)        
        )
    }
    //protected permite a classe que herdam da classe ter acesso aos métodos
    protected jsonDataToResource(jsonData: any): T{
        return this.jsonDataToResourceFn(jsonData);
    }

    protected jsonDataToResources(jsonData: any[]): T[]{
        const resources: T[] = [];
        //For para cada elemento no json
        jsonData.forEach(
            //this.jsonDataToResourceFn executando o método recebido no construtor 
            element => resources.push(this.jsonDataToResourceFn(element))
        );
        return resources;
    } 

    protected handleError(error: any): Observable<any>{
        console.log("Erro na requisição => ", error);
        return throwError(error);
    }  
}