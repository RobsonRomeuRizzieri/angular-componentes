import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { EntradasRoutingModule } from './entradas-routing.module';
import { EntradaListComponent } from './entrada-list/entrada-list.component';
import { EntradaFormComponent } from './entrada-form/entrada-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
  declarations: [EntradaListComponent, EntradaFormComponent],
  imports: [    
    SharedModule,
    EntradasRoutingModule,    
    CalendarModule,
    IMaskModule        
  ]
})
export class EntradasModule { }
