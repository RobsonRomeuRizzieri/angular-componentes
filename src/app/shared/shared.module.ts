import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [
    BreadCrumbComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    //Todos os módulos exportados são conhecidos porquem importar o módulo
    CommonModule,
    ReactiveFormsModule,
    //Para que todos os módulos tenham acesso ao componente
    BreadCrumbComponent,
    RouterModule
  ]
})
export class SharedModule { }
