import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawingPage } from './drawing.page';

const routes: Routes = [
  {
    path: '',
    component: DrawingPage
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
export class DrawingPageRoutingModule {}
