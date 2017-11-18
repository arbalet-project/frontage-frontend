import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SweepRandOptionsPage } from './sweep-rand-options';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    SweepRandOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SweepRandOptionsPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
})
export class SweepRandOptionsPageModule {}
