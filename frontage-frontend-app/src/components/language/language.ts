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

  languageAlertOpts: { title: string };

  constructor(public translateLanguageProvider: TranslateLanguageProvider, public translateProvider: TranslateService) {
    this.selectedLanguage = "fr";
    this.translateLanguageProvider.setDefaultLanguage(this.selectedLanguage);

    this.languageAlertOpts = {
      title : 'Sélectionner votre langue'
    };
  }

  changeLanguage() {
    this.translateLanguageProvider.setLanguage(this.selectedLanguage);
  }
}
