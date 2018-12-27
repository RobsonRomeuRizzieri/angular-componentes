import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Categorias } from "../shared/categorias.model";
import { CategoriasService } from "../shared/categorias.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  //Vai ter o novo ou editar
  currentAction: string;
  categoriaForm: FormGroup;
  tituloDaPagia: string;
  serverErrorMessages: string[] = null;
  submitForm: boolean = false;
  categoria: Categorias = new Categorias();

  constructor(
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked() {
    this.setPageTitle();    
  }

  submitFormValidar(){
    this.submitForm = true;
    if (this.currentAction == "novo")
      this.criarCategoria();
    else //CurrentAction == "editar"
      this.alterarCategoria();
  }

  private criarCategoria(){
    //Esta atribuindo os valores do formulário para um novo objeto de categoria
    //Esse objeto novo está sendo atribuido para a constante 
    const categoria: Categorias = Object.assign(new Categorias(), this.categoriaForm.value);

    this.categoriaService.create(categoria)
      .subscribe(
        categoria => this.actionsForSucess(categoria),
        error => this.actionsForError(error)
      )
  }


  private alterarCategoria(){
    //Esta atribuindo os valores do formulário para um novo objeto de categoria
    //Esse objeto novo está sendo atribuido para a constante 
    const categoria: Categorias = Object.assign(new Categorias(), this.categoriaForm.value);

    this.categoriaService.update(categoria)
      .subscribe(
        categoria => this.actionsForSucess(categoria),
        error => this.actionsForError(error)
      )    
  }

  private actionsForSucess(categoria: Categorias){
    toastr.success("Solicitação processada com sucesso");
    //vamos sair da rota categoiras/novo
    //vamos para categoriras/
    //indo para categorias/editar
    //Atualizando o formulário de novo para formulário de edição
    //Isso é transparente o usuário não vai nem perceber isso
    //     comando para não dicionar a URL no histórico do navegador
    //     skipLocationChange: true

    //redirect/reload component page
    this.router.navigateByUrl("categorias", {skipLocationChange: true}).then(
      //quando retornar do promisses vamos redirecionar para a url de edição
      () => this.router.navigate(["categorias", categoria.id, "editar"])
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
      this.tituloDaPagia = "Cadastro de nova categoria"
    else{
      //Evita erro de valor invalido porque iniciamos a categoria como vazia 
      //assim ele vai atribuir vazio caso ainda não tenha carregado a categoria
      const categoriaNome = this.categoria.nome || ""
      this.tituloDaPagia = "Editando categoria: " + categoriaNome;
    }
      
  }

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "novo")
      this.currentAction = "novo"
    else
      this.currentAction = "editar"
  }

  private buildCategoriaForm(){
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  private loadCategoria(){
    if (this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get("id")))
      )
      .subscribe(
        (categorias) => {
          this.categoria = categorias;
          //binds load categorias data to categoriaForms
          this.categoriaForm.patchValue(categorias)
        },
        (error) => alert('Ocorreu um erro no servior, tente mais tarde.')
      )
    }
  }
}
