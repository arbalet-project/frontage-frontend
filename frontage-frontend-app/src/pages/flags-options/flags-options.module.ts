import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlagsOptionsPage } from './flags-options';

@NgModule({
  declarations: [
    FlagsOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlagsOptionsPage),
  ],
})
export class FlagsOptionsPageModule {}
