import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawingPage } from './drawing.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: DrawingPage
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
export class DrawingPageRoutingModule {}
