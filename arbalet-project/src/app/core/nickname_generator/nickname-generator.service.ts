import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  adjectivesEn,
  nounsEn,
  nounsFrMale,
  adjectivesFrMale,
  nounsFrFemale,
  adjectivesFrFemale,
} from "./nickname_data";

@Injectable({
  providedIn: "root",
})
export class NicknameGeneratorService {
  constructor(public translate: TranslateService) {}

  generateNickname(): string {
    let lang = this.translate.currentLang;
    if (lang == "fr") {
      return this.generateNicknameFr();
    } else {
      return this.generateNicknameEn();
    }
  }

  generateNicknameEn(): string {
    return (
      adjectivesEn[this.getRandom(adjectivesEn.length)] +
      " " +
      nounsEn[this.getRandom(nounsEn.length)]
    );
  }

  generateNicknameFr(): string {
    let noun = "";
    let adj = "";

    if (Math.random() < 0.5) {
      noun = nounsFrMale[this.getRandom(nounsFrMale.length)];
      adj = adjectivesFrMale[this.getRandom(adjectivesFrMale.length)];
    } else {
      noun = nounsFrFemale[this.getRandom(nounsFrFemale.length)];
      adj = adjectivesFrFemale[this.getRandom(adjectivesFrFemale.length)];
    }

    return noun + " " + adj;
  }

  private getRandom(to: number): number {
    return Math.floor(Math.random() * to);
  }
}
