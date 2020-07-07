import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlagsPage } from './flags.page';

const routes: Routes = [
  {
    path: '',
    component: FlagsPage
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
export class FlagsPageRoutingModule {}
