import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { RandomFlashingOptionsPage } from './random-flashing-options';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    RandomFlashingOptionsPage
  ],
  imports: [
    IonicPageModule.forChild(RandomFlashingOptionsPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
})
export class RandomFlashingOptionsPageModule {}