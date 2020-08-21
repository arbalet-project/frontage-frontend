import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SweepasyncPageRoutingModule } from './sweepasync-routing.module';

import { SweepasyncPage } from './sweepasync.page';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    SweepasyncPageRoutingModule
  ],
  declarations: [SweepasyncPage, OptionsPage]
})
export class SweepasyncPageModule {}
