import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnakePage } from './snake.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: SnakePage
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
export class SnakePageRoutingModule {}
