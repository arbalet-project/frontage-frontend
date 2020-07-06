import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SweepasyncPageRoutingModule } from './sweepasync-routing.module';

import { SweepasyncPage } from './sweepasync.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SweepasyncPageRoutingModule
  ],
  declarations: [SweepasyncPage]
})
export class SweepasyncPageModule {}
