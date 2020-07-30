import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnapPage } from './snap.page';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  {
    path: '',
    component: SnapPage
  },
  {
    path: 'options',
    component: OptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SnapPageRoutingModule {}
