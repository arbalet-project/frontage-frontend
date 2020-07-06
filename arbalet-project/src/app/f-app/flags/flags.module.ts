import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlagsPageRoutingModule } from './flags-routing.module';

import { FlagsPage } from './flags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlagsPageRoutingModule
  ],
  declarations: [FlagsPage]
})
export class FlagsPageModule {}
