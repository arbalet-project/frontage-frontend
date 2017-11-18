import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the TranslateLanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslateLanguageProvider {

  constructor(public translateProvider:TranslateService) {
  }

  setLanguage(language: string) {
    this.translateProvider.use(language);
  }

}
