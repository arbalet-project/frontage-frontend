import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FAppOptions } from './../../models/f-app-options';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the SweepRandOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sweep-rand-options',
  templateUrl: 'sweep-rand-options.html',
})
export class SweepRandOptionsPage {
  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder) {
    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  lauchApp() {

    let options: FAppOptions = {
      name: "SweepRand",
      playable: "true",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: [ this.fAppOptions.value.fAppColor ],
        uapp: "flashes"
      }
    }

    
    this.dataFAppsProvider
      .launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response}));
  }
}
