import { Component } from '@angular/core';
import { BaseresourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Entrada } from "../shared/entrada.model";
import { EntradaService } from "../shared/entrada.service";

@Component({
  selector: 'app-entrada-list',
  templateUrl: './entrada-list.component.html',
  styleUrls: ['./entrada-list.component.css']
})
export class EntradaListComponent extends BaseresourceListComponent<Entrada> {

  constructor(private entradaService: EntradaService) { 
    super(entradaService);
  }
  
}
