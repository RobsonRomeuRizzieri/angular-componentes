import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';


@NgModule({
  declarations: [CategoriaListComponent, CategoriaFormComponent],
  imports: [    
    SharedModule,
    CategoriasRoutingModule,    
  ]
})
export class CategoriasModule { }
