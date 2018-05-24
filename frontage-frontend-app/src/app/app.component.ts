import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Insomnia } from '@ionic-native/insomnia';

import { Observable } from 'rxjs/Rx';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private insomnia: Insomnia) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {


      //desactivate automatic sleeping mode
      this.keepAppAwake();

      this.platform.registerBackButtonAction(() => {

        let activeView: ViewController = this.nav.getActive();

        if(activeView != null){
          if (typeof activeView.instance.backButtonAction === 'function'){
            activeView.instance.backButtonAction();
          }
          else if(this.nav.canGoBack()) {
            this.nav.pop();
          }
          else {
            this.nav.parent.select(0); // goes to the first tab
          }
        }
      });
  }


  keepAppAwake() {
    Observable.interval(2000).subscribe(() => {
      this.insomnia.keepAwake()
        .then(
          () => console.log('Keep awake success'),
          () => console.log('Keep awake error')
        )});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
