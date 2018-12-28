import { Injectable, Injector } from '@angular/core'
import { BaseResourceService } from "../../../shared/services/base-resource.service"
import { Categorias } from "./categorias.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends BaseResourceService<Categorias>{  

  constructor(protected injector: Injector) { 
    super("api/categorias", injector, Categorias.fromJson);
  }

}
