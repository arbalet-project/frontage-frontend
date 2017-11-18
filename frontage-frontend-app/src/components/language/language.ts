import { TranslateLanguageProvider } from './../../providers/translate-language/translate-language';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the LanguageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'language',
  templateUrl: 'language.html'
})
export class LanguageComponent {

  selectedLanguage: string = "fr";

  constructor(public translateLanguageProvider: TranslateLanguageProvider, public translateProvider: TranslateService) {
    this.selectedLanguage = "fr";
  }

  changeLanguage() {
    this.translateLanguageProvider.setLanguage(this.selectedLanguage);
  }
}
