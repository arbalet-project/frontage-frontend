import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
const { CapacitorKeepScreenOn } = Plugins;
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // StatusBar.styleDefault();
      SplashScreen.hide();
    });

    this.translate.setDefaultLang('fr');

    if (this.platform.is('mobile')) {
      // Enable plugin to keep screen on
       CapacitorKeepScreenOn.enable();
    }
  }
}
