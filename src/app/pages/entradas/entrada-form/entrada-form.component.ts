import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Categorias } from "../../categorias/shared/categorias.model";

import { Entrada } from "../shared/entrada.model";
import { EntradaService } from "../shared/entrada.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { CategoriasService } from '../../categorias/shared/categorias.service';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent implements OnInit, AfterContentChecked {

  //Vai ter o novo ou editar
  currentAction: string;
  entradaForm: FormGroup;
  tituloDaPagia: string;
  serverErrorMessages: string[] = null;
  submitForm: boolean = false;
  entrada: Entrada = new Entrada();
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
    private entradaService: EntradaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriasService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntradaForm();
    this.loadEntrada();
    this.loadCategorias();
  }

  ngAfterContentChecked() {
    this.setPageTitle();    
  }

  submitFormValidar(){
    this.submitForm = true;
    if (this.currentAction == "novo")
      this.criarEntrada();
    else //CurrentAction == "editar"
      this.alterarEntrada();
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

  private criarEntrada(){
    //Esta atribuindo os valores do formulário para um novo objeto de categoria
    //Esse objeto novo está sendo atribuido para a constante 
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.create(entrada)
      .subscribe(
        entrada => this.actionsForSucess(entrada),
        error => this.actionsForError(error)
      )
  }


  private alterarEntrada(){
    //Esta atribuindo os valores do formulário para um novo objeto de categoria
    //Esse objeto novo está sendo atribuido para a constante 
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.update(entrada)
      .subscribe(
        entrada => this.actionsForSucess(entrada),
        error => this.actionsForError(error)
      )    
  }

  private actionsForSucess(entrada: Entrada){
    toastr.success("Solicitação processada com sucesso");
    //vamos sair da rota categoiras/novo
    //vamos para categoriras/
    //indo para categorias/editar
    //Atualizando o formulário de novo para formulário de edição
    //Isso é transparente o usuário não vai nem perceber isso
    //     comando para não dicionar a URL no histórico do navegador
    //     skipLocationChange: true

    //redirect/reload component page
    this.router.navigateByUrl("entradas", {skipLocationChange: true}).then(
      //quando retornar do promisses vamos redirecionar para a url de edição
      () => this.router.navigate(["entradas", entrada.id, "editar"])
    );
  }

  private actionsForError(error){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submitForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por vavor, tente mais tarde."]
  }

  private setPageTitle(){
    if (this.currentAction == "novo")
      this.tituloDaPagia = "Cadastro de novo lançamento"
    else{
      //Evita erro de valor invalido porque iniciamos a categoria como vazia 
      //assim ele vai atribuir vazio caso ainda não tenha carregado a categoria
      const entradaNome = this.entrada.nome || ""
      this.tituloDaPagia = "Editando lançamento: " + entradaNome;
    }
      
  }

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "novo")
      this.currentAction = "novo"
    else
      this.currentAction = "editar"
  }

  private buildEntradaForm(){
    this.entradaForm = this.formBuilder.group({
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

  private loadEntrada(){
    if (this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.entradaService.getById(+params.get("id")))
      )
      .subscribe(
        (entrada) => {
          this.entrada = entrada;
          //binds load categorias data to categoriaForms
          this.entradaForm.patchValue(entrada)
        },
        (error) => alert('Ocorreu um erro no servior, tente mais tarde.')
      )
    }
  }
}
