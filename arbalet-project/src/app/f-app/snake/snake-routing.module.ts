import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnakePage } from './snake.page';

const routes: Routes = [
  {
    path: '',
    component: SnakePage
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
export class SnakePageRoutingModule {}
