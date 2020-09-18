import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlagsPageRoutingModule } from './flags-routing.module';

import { FlagsPage } from './flags.page';
import { TranslateModule } from '@ngx-translate/core';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    FlagsPageRoutingModule,
  ],
  declarations: [FlagsPage, OptionsPage]
})
export class FlagsPageModule {}
