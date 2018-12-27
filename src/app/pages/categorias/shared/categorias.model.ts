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

}