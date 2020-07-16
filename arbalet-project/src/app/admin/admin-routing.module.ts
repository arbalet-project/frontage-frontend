import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'params',
        loadChildren: () => import('./params/params.module').then(m => m.ParamsPageModule)
      },
      {
        path: 'f-app',
        loadChildren: () => import('./f-app/f-app.module').then(m => m.FAppPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
