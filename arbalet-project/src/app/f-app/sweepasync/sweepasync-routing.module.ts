import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweepasyncPage } from './sweepasync.page';

const routes: Routes = [
  {
    path: '',
    component: SweepasyncPage
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
export class SweepasyncPageRoutingModule {}