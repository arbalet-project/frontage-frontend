import { WaitingPage } from './../waiting/waiting';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SweepAsyncJoystickPage } from '../sweep-async-joystick/sweep-async-joystick';

@Component({
  selector: 'page-sweep-async-options',
  templateUrl: 'sweep-async-options.html',
})
export class SweepAsyncOptionsPage {
  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder) {
    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  launchApp() {

    let options: FAppOptions = {
      name: "SweepAsync",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: [this.fAppOptions.value.fAppColor],
        uapp: "swipe"
      }
    }


    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: SweepAsyncJoystickPage });
  }
}
