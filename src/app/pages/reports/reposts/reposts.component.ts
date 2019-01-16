import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {Categorias} from "../../categorias/shared/categorias.model";
import {CategoriasService} from "../../categorias/shared/categorias.service";

import {Entrada} from "../../entradas/shared/entrada.model";
import {EntradaService} from "../../entradas/shared/entrada.service";

import currencyFormatter from "currency-formatter";

@Component({
  selector: 'app-reposts',
  templateUrl: './reposts.component.html',
  styleUrls: ['./reposts.component.css']
})
export class RepostsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: {
        ticks: {
          beginatZero: true
        }
      }
    }
  };

  categorias: Categorias[] = [];
  entradas: Entrada[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(
    private entradaService: EntradaService, 
    private categoriaService: CategoriasService
  ) { }

  ngOnInit() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }

  generateReports(){
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year)
      alert('Você precisa selecionar o mês e o ano para gerar os relatórios');
    else
      this.entradaService.getByMonthAndYear(month, year).subscribe(
        //bind mantem this principal.
        this.setValues.bind(this)
      )
  }

  private setValues(entradas: Entrada[]){
    this.entradas = entradas;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance(){
    let expensetotal = 0;
    let revenueTotal = 0;

    this.entradas.forEach(entrada => {
      if (entrada.tipo == 'receita')
        revenueTotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL'})
      else
        expensetotal += currencyFormatter.unformat(entrada.valor, { code: 'BRL'})
    });

    this.expenseTotal = currencyFormatter.format(expensetotal, {code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expensetotal, {code: 'BRL'});
  }

  private setChartData(){
    this.revenueChartData = this.getChartData('receita', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('despesa', 'Gráfico de Despesas', '#9CCCCC');
  }

  private getChartData(tipoEntrada: string, titulo: string, cor: string){
    const chartData = [];

    this.categorias.forEach(categoria => {      
      //filtrando laçamentos por tipo e categoria
      const filterEntradas = this.entradas.filter(        
        entrada => (entrada.categoriaId == categoria.id) && (entrada.tipo == tipoEntrada)
      )

      //se achou lançamento para a categoria coloca ele no gráfico
      //Isso só vai listar as categorias que têm lançamentos      
      if (filterEntradas.length > 0){      
        const totalAmount = filterEntradas.reduce(
          (total, entrada) => total + currencyFormatter.unformat(entrada.valor, { code: 'BRL'}), 0
        )

        chartData.push({
          categoriaNome: categoria.nome,
          totalAmount: totalAmount
        })
      }
    });

    return {
      labels: chartData.map(item => item.categoriaNome),
      datasets: [{
        label: titulo,
        backgroundColor: cor,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}
