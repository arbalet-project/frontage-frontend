import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FAppPage } from './f-app.page';

const routes: Routes = [
  {
    path: '',
    component: FAppPage
  },
  {
    path: 'tetris',
    loadChildren: () => import('./tetris/tetris.module').then( m => m.TetrisPageModule)
  },
  {
    path: 'snake',
    loadChildren: () => import('./snake/snake.module').then( m => m.SnakePageModule)
  },
  {
    path: 'drawing',
    loadChildren: () => import('./drawing/drawing.module').then( m => m.DrawingPageModule)
  },
  {
    path: 'flags',
    loadChildren: () => import('./flags/flags.module').then( m => m.FlagsPageModule)
  },
  {
    path: 'randomflashing',
    loadChildren: () => import('./randomflashing/randomflashing.module').then( m => m.RandomflashingPageModule)
  },
  {
    path: 'sweeprand',
    loadChildren: () => import('./sweeprand/sweeprand.module').then( m => m.SweeprandPageModule)
  },
  {
    path: 'sweepasync',
    loadChildren: () => import('./sweepasync/sweepasync.module').then( m => m.SweepasyncPageModule)
  },
  {
    path: 'snap',
    loadChildren: () => import('./snap/snap.module').then( m => m.SnapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAppPageRoutingModule {}
