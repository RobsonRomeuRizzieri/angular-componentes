import { Component, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseresourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resourceRetorno => this.resources = resourceRetorno.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')      
    )
  }

  deletarResource(resource: T){
    const excluir = confirm('Deseja realmente excluir este item?');

    if (excluir){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir")    
      )
    }
  }
  
}
