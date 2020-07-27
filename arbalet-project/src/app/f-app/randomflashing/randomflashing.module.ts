import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomflashingPageRoutingModule } from './randomflashing-routing.module';

import { RandomflashingPage } from './randomflashing.page';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ColorChromeModule } from 'ngx-color/chrome'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    ColorChromeModule,
    RandomflashingPageRoutingModule
  ],
  declarations: [RandomflashingPage, OptionsPage]
})
export class RandomflashingPageModule {}
