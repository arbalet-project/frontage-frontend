import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweeprandPage } from './sweeprand.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: SweeprandPage
  },
  {
    path: 'options',
    component: OptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SweeprandPageRoutingModule { }
