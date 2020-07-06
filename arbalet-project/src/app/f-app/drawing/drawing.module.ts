import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawingPageRoutingModule } from './drawing-routing.module';

import { DrawingPage } from './drawing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawingPageRoutingModule
  ],
  declarations: [DrawingPage]
})
export class DrawingPageModule {}
