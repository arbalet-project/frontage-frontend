import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SnakePageRoutingModule } from './snake-routing.module';

import { SnakePage } from './snake.page';
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
    SnakePageRoutingModule
  ],
  declarations: [SnakePage, OptionsPage, JoystickComponent]
})
export class SnakePageModule {}
