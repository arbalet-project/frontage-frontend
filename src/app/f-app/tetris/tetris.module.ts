import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TetrisPageRoutingModule } from './tetris-routing.module';

import { TetrisPage } from './tetris.page';
import { TranslateModule } from '@ngx-translate/core';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';
import { JoystickComponent } from './joystick/joystick.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    TetrisPageRoutingModule
  ],
  declarations: [TetrisPage, OptionsPage, JoystickComponent]
})
export class TetrisPageModule { }
