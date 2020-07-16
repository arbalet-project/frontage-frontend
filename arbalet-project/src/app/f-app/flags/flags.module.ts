import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlagsPageRoutingModule } from './flags-routing.module';

import { FlagsPage } from './flags.page';
import { TranslateModule } from '@ngx-translate/core';
import { RadioListComponent } from '../components/form/radio-list/radio-list.component';
import { HeaderOptionsComponent } from '../components/header-options/header-options.component';
import { FooterOptionsComponent } from '../components/footer-options/footer-options.component';
import { WaitingComponent } from '../components/waiting/waiting.component';
import { OptionsPage } from './options/options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    FlagsPageRoutingModule
  ],
  declarations: [FlagsPage, OptionsPage, RadioListComponent, HeaderOptionsComponent, FooterOptionsComponent, WaitingComponent]
})
export class FlagsPageModule {}
