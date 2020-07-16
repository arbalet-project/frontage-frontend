import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomflashingPage } from './randomflashing.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: RandomflashingPage
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
export class RandomflashingPageRoutingModule {}
