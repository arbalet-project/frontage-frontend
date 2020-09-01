import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsPage } from './settings/settings.page';
import { ListComponent } from './settings/components/list/list.component';
import { LifetimeComponent } from './settings/components/lifetime/lifetime.component';
import { FappComponent } from './fapp/fapp.component';
import { FappListComponent } from '../components/fapp-list/fapp-list.component';

import { Chooser } from '@ionic-native/chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AdminPage, SettingsPage, ListComponent, LifetimeComponent, FappComponent, FappListComponent],
  providers: [
    Chooser
  ]
})
export class AdminPageModule { }
