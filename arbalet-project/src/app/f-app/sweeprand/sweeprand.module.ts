import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SweeprandPageRoutingModule } from './sweeprand-routing.module';

import { SweeprandPage } from './sweeprand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SweeprandPageRoutingModule
  ],
  declarations: [SweeprandPage]
})
export class SweeprandPageModule {}
