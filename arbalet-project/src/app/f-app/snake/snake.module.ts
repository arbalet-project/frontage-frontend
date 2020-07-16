import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SnakePageRoutingModule } from './snake-routing.module';

import { SnakePage } from './snake.page';
import { TranslateModule } from '@ngx-translate/core';
import { OptionsPage } from './options/options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SnakePageRoutingModule
  ],
  declarations: [SnakePage, OptionsPage]
})
export class SnakePageModule {}
