import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SnapPageRoutingModule } from './snap-routing.module';

import { SnapPage } from './snap.page';
import { OptionsComponent } from './options/options.component';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    SnapPageRoutingModule
  ],
  declarations: [SnapPage, OptionsComponent]
})
export class SnapPageModule {}
