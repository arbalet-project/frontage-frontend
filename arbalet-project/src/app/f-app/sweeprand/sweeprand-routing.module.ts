import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweeprandPage } from './sweeprand.page';

const routes: Routes = [
  {
    path: '',
    component: SweeprandPage
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SweeprandPageRoutingModule {}
