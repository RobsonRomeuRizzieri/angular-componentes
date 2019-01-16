import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../models/base-resource.model"
import { BaseResourceService } from "../../services/base-resource.service"

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { resource } from 'selenium-webdriver/http';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  //Vai ter o novo ou editar
  currentAction: string;
  resourceForm: FormGroup;
  tituloDaPagia: string;
  serverErrorMessages: string[] = null;
  submitForm: boolean = false;  

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T, // recebe por exemplo new categoria
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T

  ) { 
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);  
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();    
  }

  submitFormValidar(){
    this.submitForm = true;
    if (this.currentAction == "novo")
      this.criarResource();
    else //CurrentAction == "editar"
      this.alterarResource();
  }

  protected criarResource(){
    //Esta atribuindo os valores do formulário para um novo objeto de resource
    //Esse objeto novo está sendo atribuido para a constante 
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
      .subscribe(
        resource => this.actionsForSucess(resource),
        error => this.actionsForError(error)
      )
  }


  protected alterarResource(){
    //Esta atribuindo os valores do formulário para um novo objeto de resource
    //Esse objeto novo está sendo atribuido para a constante 
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
      .subscribe(
        resource => this.actionsForSucess(resource),
        error => this.actionsForError(error)
      )    
  }

  protected actionsForSucess(resource: T){
    toastr.success("Solicitação processada com sucesso");
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    //redirect/reload component page
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
        //quando retornar do promisses vamos redirecionar para a url de edição
        () => this.router.navigate([baseComponentPath, resource.id, "editar"])
    );

    //vamos sair da rota categoiras/novo
    //vamos para categoriras/
    //indo para categorias/editar
    //Atualizando o formulário de novo para formulário de edição
    //Isso é transparente o usuário não vai nem perceber isso
    //     comando para não dicionar a URL no histórico do navegador
    //     skipLocationChange: true

    //redirect/reload component page
    //this.router.navigateByUrl("categorias", {skipLocationChange: true}).then(
    //  //quando retornar do promisses vamos redirecionar para a url de edição
    //  () => this.router.navigate(["categorias", categoria.id, "editar"])
    //);
  }

  protected actionsForError(error){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submitForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por vavor, tente mais tarde."]
  }

  protected setPageTitle(){
    if (this.currentAction == "novo")
      this.tituloDaPagia = this.criarTituloPagina()
    else{
      this.tituloDaPagia = this.alterarTituloPagina();
    }
      
  }

  protected criarTituloPagina(): string {
    return "Novo"
  }

  protected alterarTituloPagina(){
    return "Edição"
  }

  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path == "novo")
      this.currentAction = "novo"
    else
      this.currentAction = "editar"
  }

  //private buildCategoriaForm(){
  //  this.categoriaForm = this.formBuilder.group({
  //    id: [null],
  //    nome: [null, [Validators.required, Validators.minLength(2)]],
  //    descricao: [null]
  //  })
  //}

  protected loadResource(){
    if (this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
      .subscribe(
        (resources) => {
          this.resource = resources;
          //binds load resources data to resourceForms
          this.resourceForm.patchValue(resources)
        },
        (error) => alert('Ocorreu um erro no servior, tente mais tarde.')
      )
    }
  }
  //método criado para se implementado na classe principal conseguindo assim definir o build form buildCategoriaForm
  protected abstract buildResourceForm(): void;
}
