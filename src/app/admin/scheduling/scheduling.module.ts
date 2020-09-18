import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage } from './scheduling.page';
import { TranslateModule } from '@ngx-translate/core';
import { FlagsComponent } from './flags/flags.component';
import { SweepasyncComponent } from './sweepasync/sweepasync.component';
import { SweeprandComponent } from './sweeprand/sweeprand.component';
import { RandomflashingComponent } from './randomflashing/randomflashing.component';
import { DrawingComponent } from './drawing/drawing.component';
import { ColorChromeModule } from 'ngx-color/chrome';
import { SharedModule } from 'src/app/f-app/components/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ColorChromeModule,
    SharedModule,
    FAppPageRoutingModule,
  ],
  declarations: [
    SchedulingPage,
    FlagsComponent,
    SweepasyncComponent,
    SweeprandComponent,
    RandomflashingComponent,
    DrawingComponent
  ],
})
export class SchedulingPageModule { }
