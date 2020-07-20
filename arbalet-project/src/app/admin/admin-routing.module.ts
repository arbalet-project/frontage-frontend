import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AdminPage,
    children: [
      {
        path: 'settings',
        component: SettingsPage
      },
      {
        path: 'fapp',
        loadChildren: () => import('./fapp/fapp.module').then(m => m.FAppPageModule)
      }
    ]
  },
  { path: '', redirectTo: '/admin/tabs/settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
