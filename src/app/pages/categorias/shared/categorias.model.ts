import { BaseResourceModel } from "../../../shared/models/base-resource.model";
export class Categorias extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string
    ){
        //Executa o construtur da classe base
        super();
    }

    //converte o json recebido em um objeto do tipo entrada
    static fromJson(jsonData: any): Categorias {
        return Object.assign(new Categorias(), jsonData) 
    }
}