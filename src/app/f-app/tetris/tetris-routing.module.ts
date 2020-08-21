import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TetrisPage } from './tetris.page';
import { OptionsPage } from './options/options.page';

const routes: Routes = [
  {
    path: '',
    component: TetrisPage
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
export class TetrisPageRoutingModule {}
