import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepostsComponent } from "./reposts/reposts.component";

const routes: Routes = [
  { path: '', component: RepostsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
