import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlagsPage } from './flags.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: FlagsPage
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
export class FlagsPageRoutingModule {}
