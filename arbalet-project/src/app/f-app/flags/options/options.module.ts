import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsPageRoutingModule } from './options-routing.module';

import { OptionsPage } from './options.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderOptionsComponent } from '../../components/header-options/header-options.component';
import { FooterOptionsComponent } from '../../components/footer-options/footer-options.component';
import { WaitingComponent } from '../../components/waiting/waiting.component';
import { RadioListComponent } from '../../components/form/radio-list/radio-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    OptionsPageRoutingModule
  ],
  declarations: [OptionsPage, HeaderOptionsComponent, FooterOptionsComponent, WaitingComponent, RadioListComponent]
})
export class OptionsPageModule {}
