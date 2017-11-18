import { TranslateService } from '@ngx-translate/core';
import { WaitingPage } from './../waiting/waiting';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SweepAsyncOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sweep-async-options',
  templateUrl: 'sweep-async-options.html',
})
export class SweepAsyncOptionsPage {
  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder, public translateProvider: TranslateService) {
    this.translateProvider.setDefaultLang('fr');
    this.translateProvider.use('fr')
    
    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  lauchApp() {

    let options: FAppOptions = {
      name: "SweepAsync",
      playable: "true",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: [ this.fAppOptions.value.fAppColor ],
        uapp: "swipe"
      }
    }

    
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response}));
  }
}
