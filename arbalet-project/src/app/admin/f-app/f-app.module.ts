import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './f-app-routing.module';

import { FAppPage } from './f-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FAppPageRoutingModule
  ],
  declarations: [FAppPage]
})
export class FAppPageModule {}
