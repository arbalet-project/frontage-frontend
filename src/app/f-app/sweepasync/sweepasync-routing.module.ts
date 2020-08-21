import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SweepasyncPage } from './sweepasync.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: SweepasyncPage
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
export class SweepasyncPageRoutingModule {}
