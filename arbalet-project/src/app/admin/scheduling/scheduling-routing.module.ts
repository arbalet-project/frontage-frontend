import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingPage } from './scheduling.page';
import { FlagsComponent } from './flags/flags.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulingPage,
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
