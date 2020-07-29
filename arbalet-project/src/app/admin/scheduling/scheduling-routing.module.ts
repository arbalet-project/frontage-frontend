import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingPage } from './scheduling.page';
import { FlagsComponent } from './flags/flags.component';
import { SweepasyncComponent } from './sweepasync/sweepasync.component';
import { SweeprandComponent } from './sweeprand/sweeprand.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulingPage,
  },
  {
    path: 'flags',
    component: FlagsComponent
  },
  {
    path: 'sweepasync',
    component: SweepasyncComponent
  },
  {
    path: 'sweeprand',
    component: SweeprandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAppPageRoutingModule { }
