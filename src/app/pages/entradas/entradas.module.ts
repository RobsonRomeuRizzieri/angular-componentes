import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntradasRoutingModule } from './entradas-routing.module';
import { EntradaListComponent } from './entrada-list/entrada-list.component';
import { EntradaFormComponent } from './entrada-form/entrada-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
  declarations: [EntradaListComponent, EntradaFormComponent],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule        
  ]
})
export class EntradasModule { }
