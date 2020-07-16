import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomflashingPageRoutingModule } from './randomflashing-routing.module';

import { RandomflashingPage } from './randomflashing.page';
import { OptionsPage } from './options/options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomflashingPageRoutingModule
  ],
  declarations: [RandomflashingPage, OptionsPage]
})
export class RandomflashingPageModule {}
