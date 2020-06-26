import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionPageRoutingModule } from './connection-routing.module';

import { ConnectionPage } from './connection.page';
import { ServerUnreacheableComponent } from './components/server-unreacheable/server-unreacheable.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ConnectionPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [ConnectionPage, ServerUnreacheableComponent]
})
export class ConnectionPageModule {}
