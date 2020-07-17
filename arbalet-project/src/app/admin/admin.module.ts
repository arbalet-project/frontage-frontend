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
import { ClearButtonComponent } from './settings/components/clear-button/clear-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AdminPage, SettingsPage, ListComponent, LifetimeComponent, ClearButtonComponent]
})
export class AdminPageModule {}
