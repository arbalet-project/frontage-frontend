import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SweeprandPageRoutingModule } from './sweeprand-routing.module';

import { SweeprandPage } from './sweeprand.page';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ColorlistComponent } from 'src/app/components/fapp/sweeprand/colorlist/colorlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    SweeprandPageRoutingModule
  ],
  declarations: [SweeprandPage, OptionsPage, ColorlistComponent]
})
export class SweeprandPageModule {}
