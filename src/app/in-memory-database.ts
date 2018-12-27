import {InMemoryDbService } from "angular-in-memory-web-api";

import { Categorias } from './pages/categorias/shared/categorias.model';
import { Entrada } from './pages/entradas/shared/entrada.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb(){
        const categorias: Categorias[] = [
            { id: 1, nome: "Moradia", descricao: "Pagamentos de contas da casa"},
            { id: 2, nome: "Saúde", descricao: "Plano de saúde e remédio"},
            { id: 3, nome: "Lazer", descricao: "Cinema, parques, praia, etc."},
            { id: 4, nome: "Salário", descricao: "Recebimento de salário"},
            { id: 5, nome: "Freelas", descricao: "Trabalhos como freelancer"}
        ];

        const entradas: Entrada[] = [
            { id: 1, nome: "Gás de cozinha", valor: "70,80", data: "14/10/2018", pago: true, categoria: categorias[0], categoriaId: categorias[0].id, tipo: "despesa", descricao: "Aplicado para fazer almoço"} as Entrada,
            { id: 2, nome: "Suplementos", valor: "15,00", data: "14/10/2018", pago: false, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 3, nome: "Salário da empresa x", valor: "8500,00", data: "15/10/2018", pago: true, categoria: categorias[3], categoriaId: categorias[3].id, tipo: "receita", descricao: ""} as Entrada,
            { id: 4, nome: "Aluguel de filme", valor: "15,00", data: "16/10/2018", pago: true, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 5, nome: "Suplementos", valor: "30,00", data: "17/10/2018", pago: true, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 6, nome: "Video game da filha", valor: "15,00", data: "17/10/2018", pago: false, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 11, nome: "uber", valor: "30,00", data: "17/10/2018", pago: true, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 12, nome: "Aluguel", valor: "15,00", data: "23/10/2018", pago: false, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 13, nome: "Gás de cozinha", valor: "30,00", data: "25/10/2018", pago: false, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "Despesa", descricao: ""} as Entrada,
            { id: 14, nome: "Pagamento pelo projeto XYZ", valor: "4000,00", data: "25/10/2018", pago: false, categoria: categorias[4], categoriaId: categorias[4].id, tipo: "receita", descricao: ""} as Entrada,
            { id: 19, nome: "Aluguel de filme", valor: "15,00", data: "07/11/2018", pago: false, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 21, nome: "Video game da filha", valor: "30,00", data: "17/11/2018", pago: true, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 22, nome: "Cinema", valor: "15,00", data: "18/11/2018", pago: true, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 23, nome: "Jiu jitsu", valor: "130,00", data: "21/11/2018", pago: false, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 44, nome: "Uber", valor: "15,00", data: "28/11/2018", pago: true, categoria: categorias[2], categoriaId: categorias[2].id, tipo: "despesa", descricao: ""} as Entrada,
            { id: 55, nome: "Cinema", valor: "30,00", data: "28/11/2018", pago: false, categoria: categorias[1], categoriaId: categorias[1].id, tipo: "despesa", descricao: ""} as Entrada
        ];



        return {categorias, entradas }
    }
}