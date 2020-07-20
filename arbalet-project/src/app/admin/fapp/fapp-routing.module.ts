import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FAppPage } from './fapp.page';
import { FlagsComponent } from './flags/flags.component';

const routes: Routes = [
  {
    path: '',
    component: FAppPage,
  },
  {
    path: 'flags',
    component: FlagsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAppPageRoutingModule { }
