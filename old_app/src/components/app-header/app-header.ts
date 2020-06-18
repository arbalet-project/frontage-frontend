import { TranslateLanguageProvider } from './../../providers/translate-language/translate-language';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() displayLanguage: boolean;

  selectedLanguage: string;
  flagState: boolean = true;

  constructor(public translateLanguageProvider: TranslateLanguageProvider, public translateProvider: TranslateService) {
  }

  ngOnInit(){
    //Init the value the first time the app is launched
    if(this.displayLanguage
          && !this.selectedLanguage){
      this.selectedLanguage = "fr";
      this.translateLanguageProvider.setDefaultLanguage(this.selectedLanguage);
    }
  }

  changeLanguage(selectedLanguage: string) {
    this.translateLanguageProvider.setLanguage(selectedLanguage);
  }

  changeFlagState(){
    this.flagState = !this.flagState;

    this.selectedLanguage = "en";
    if(this.flagState){
      this.selectedLanguage = "fr";
    }

    this.changeLanguage(this.selectedLanguage);
  }
}
