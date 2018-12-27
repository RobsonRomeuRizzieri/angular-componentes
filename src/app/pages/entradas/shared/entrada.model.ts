import { Categorias } from "../../categorias/shared/categorias.model";

export class Entrada {
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
        
    }

    static tipo = {
        depesa: 'Despesa',
        receita: 'Receita'
    }

    get pagoText(): string{
        return this.pago ? 'Pago' : 'Pendente';
    }
}