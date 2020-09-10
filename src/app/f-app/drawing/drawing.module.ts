import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawingPageRoutingModule } from './drawing-routing.module';

import { DrawingPage } from './drawing.page';
import { OptionsPage } from './options/options.page';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild(),
    DrawingPageRoutingModule
  ],
  declarations: [DrawingPage, OptionsPage, CanvasComponent]
})
export class DrawingPageModule {}
