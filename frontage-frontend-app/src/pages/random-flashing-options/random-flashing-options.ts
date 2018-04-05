import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RandomFlashingJoystickPage } from '../random-flashing-joystick/random-flashing-joystick';

@Component({
  selector: 'page-random-flashing-options',
  templateUrl: 'random-flashing-options.html',
})
export class RandomFlashingOptionsPage {

  fAppPosition: number;
  parametersList: string[] = ["darkblue", "pink"];
  selectedParameter: string = "darkblue";
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider) {

    this.isAdmin = this.localStorageProvider.isAdmin();

  }

  startFapp() {

    let options: FAppOptions = {
      name: "RandomFlashing",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: this.selectedParameter,
        uapp: "flashes"
      }
    }

    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: RandomFlashingJoystickPage, joystickParams: { parametersList: this.parametersList, selectedParameter: this.selectedParameter } });
  }

  forceFapp() {
    let options: FAppOptions = {
      name: "RandomFlashing",
      params: {}
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }

  sendScheduledFappOptions() {
    let options: FAppOptions = {
      name: "RandomFlashing",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: this.selectedParameter,
        uapp: "flashes"
      }
    };

    this.adminProvider.sendScheduledFappOptions(options)
      .subscribe(response => this.goToNextPage(response));
  }
}

