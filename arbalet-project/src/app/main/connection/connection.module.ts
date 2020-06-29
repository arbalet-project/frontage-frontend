import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionPageRoutingModule } from './connection-routing.module';

import { ConnectionPage } from './connection.page';
import { ServerUnreachableComponent } from './components/server-unreachable/server-unreachable.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ConnectionPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [ConnectionPage, ServerUnreachableComponent, UserFormComponent]
})
export class ConnectionPageModule {}
