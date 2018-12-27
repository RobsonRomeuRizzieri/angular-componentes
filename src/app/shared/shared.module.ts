import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    //Todos os módulos exportados são conhecidos porquem importar o módulo
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
