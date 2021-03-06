import { BaseResourceModel } from "../../../shared/models/base-resource.model";
import { Categorias } from "../../categorias/shared/categorias.model";

export class Entrada extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categorias
    ){
        //executa o construtor da classe extendida
        super();
    }

    static tipo = {
        depesa: 'Despesa',
        receita: 'Receita'
    }

    //converte o json recebido em um objeto do tipo entrada
    static fromJson(jsonData: any): Entrada {
       return Object.assign(new Entrada(), jsonData) 
    }

    get pagoText(): string{
        return this.pago ? 'Pago' : 'Pendente';
    }
}