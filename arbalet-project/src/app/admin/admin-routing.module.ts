import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { SettingsPage } from './settings/settings.page';
import { FappComponent } from './fapp/fapp.component';

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
        path: 'scheduling',
        loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingPageModule)
      },
      {
        path: 'fapp',
        component: FappComponent
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
