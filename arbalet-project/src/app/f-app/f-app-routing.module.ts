import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FAppPage } from './f-app.page';

const routes: Routes = [
  {
    path: '',
    component: FAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAppPageRoutingModule {}
