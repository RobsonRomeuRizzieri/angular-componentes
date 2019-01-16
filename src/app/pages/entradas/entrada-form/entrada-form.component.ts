import { Component, OnInit, Injector} from '@angular/core';
import { Validators} from "@angular/forms";

import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component"
import { Categorias } from "../../categorias/shared/categorias.model";
import { CategoriasService } from '../../categorias/shared/categorias.service';

import { Entrada } from "../shared/entrada.model";
import { EntradaService } from "../shared/entrada.service";

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent extends BaseResourceFormComponent<Entrada> implements OnInit {

  categorias: Array<Categorias>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho',
      'Agosto','Setembro','Outubro','Novembro','Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entradaService: EntradaService,    
    protected categoriaService: CategoriasService,
    protected injector: Injector
  ) { 
    super(injector, new Entrada(), entradaService, Entrada.fromJson)
  }

  ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
  }

  get tipoOptions(): Array<any>{
    return Object.entries(Entrada.tipo).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      })    
  }

  private loadCategorias(){
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    )
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ["despesa", Validators.required],
      valor: [null, Validators.required],
      data: [null, Validators.required],                  
      pago: [true, Validators.required],
      categoriaId: [null, Validators.required],
    })
  }

  //Soprepondo a definição dos títulos
  protected criarTituloPagina(): string {
    return "Cadastro de novo lançamento"
  }
  //Soprepondo definição dos títulos
  protected alterarTituloPagina(): string {
    //Tratamento para não dar undefinede
    const lancamentoNome = this.resource.nome || "";
    return "Alterando lançamento: " + lancamentoNome;
  }  
}
