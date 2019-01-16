import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'entradas', loadChildren: './pages/entradas/entradas.module#EntradasModule'},  
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasModule'},  
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
