import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomflashingPage } from './randomflashing.page';

const routes: Routes = [
  {
    path: '',
    component: RandomflashingPage
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
export class RandomflashingPageRoutingModule {}
