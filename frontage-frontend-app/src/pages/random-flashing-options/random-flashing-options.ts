import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RandomFlashingJoystickPage } from '../random-flashing-joystick/random-flashing-joystick';

/**
 * Generated class for the RandomFlashingOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-random-flashing-options',
  templateUrl: 'random-flashing-options.html',
})
export class RandomFlashingOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder) {
    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  lauchApp() {

    let options: FAppOptions = {
      name: "RandomFlashing",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: [ this.fAppOptions.value.fAppColor ],
        uapp: "flashes"
      }
    }

    
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response, joystick:RandomFlashingJoystickPage}));
  }
}

