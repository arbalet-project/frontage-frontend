import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RandomFlashingJoystickPage } from '../random-flashing-joystick/random-flashing-joystick';

@Component({
  selector: 'page-random-flashing-options',
  templateUrl: 'random-flashing-options.html',
})
export class RandomFlashingOptionsPage {

  fAppPosition: number;
  parametersList: string[] = ["darkblue", "deeppink"];
  selectedParameter: string = "darkblue";
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider) {

    this.isAdmin = this.localStorageProvider.isAdmin();

  }

  startFapp() {

    let options = {
      name: "RandomFlashing",
      params: {
        colors:  this.selectedParameter
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
    let options = {
      name: "RandomFlashing",
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }

  sendScheduledFappOptions() {
    let options = {
      name: "RandomFlashing",
      params: {
        colors:  this.selectedParameter
      }
    };

    this.adminProvider.sendScheduledFAppOptions(options)
      .subscribe(response => this.goToNextPage(response));
  }
}

