import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'entradas', loadChildren: './pages/entradas/entradas.module#EntradasModule'},  
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasModule'},  
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule'},

  //Se não definida a URL vai abrir os relatórios
  { path: '', redirectTo: '/reports', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
