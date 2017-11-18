import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlagsOptionsPage } from './flags-options';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    FlagsOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FlagsOptionsPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
})
export class FlagsOptionsPageModule {}
