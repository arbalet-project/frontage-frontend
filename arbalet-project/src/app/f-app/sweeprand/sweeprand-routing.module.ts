import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweeprandPage } from './sweeprand.page';

const routes: Routes = [
  {
    path: '',
    component: SweeprandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SweeprandPageRoutingModule {}
