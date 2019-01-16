import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { RepostsComponent } from './reposts/reposts.component';

@NgModule({
  declarations: [RepostsComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
