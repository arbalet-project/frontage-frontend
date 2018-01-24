import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateLanguageProvider {

  constructor(public translateProvider:TranslateService) {
  }

  setDefaultLanguage(language: string){
    this.translateProvider.setDefaultLang(language);
    this.translateProvider.use(language);
  }

  setLanguage(language: string) {
    this.translateProvider.use(language);
  }
}
