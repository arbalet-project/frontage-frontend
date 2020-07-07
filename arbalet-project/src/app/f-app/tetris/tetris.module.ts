import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TetrisPageRoutingModule } from './tetris-routing.module';

import { TetrisPage } from './tetris.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    TetrisPageRoutingModule
  ],
  declarations: [TetrisPage]
})
export class TetrisPageModule {}
