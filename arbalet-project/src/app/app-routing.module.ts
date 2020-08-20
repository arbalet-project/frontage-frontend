import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/authentication/guard/admin.guard';
import { UserGuard } from './core/authentication/guard/user.guard';
import { HomePage } from './main/home/home.page';
import { ConnectionPage } from './main/connection/connection.page';
import { OfflineTetrisComponent } from './main/offline-tetris/offline-tetris.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'connection',
    component: ConnectionPage
  },
  {
    path: 'offline-tetris',
    component: OfflineTetrisComponent
  },
  {
    path: 'f-app',
    loadChildren: () => import('./f-app/f-app.module').then(m => m.FAppPageModule),
    canActivate: [UserGuard],
    canActivateChild: [UserGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
