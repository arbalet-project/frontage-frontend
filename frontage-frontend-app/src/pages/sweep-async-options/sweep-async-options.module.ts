import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SweepAsyncOptionsPage } from './sweep-async-options';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    SweepAsyncOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SweepAsyncOptionsPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
})
export class SweepAsyncOptionsPageModule{}