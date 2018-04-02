import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { WaitingPage } from './../waiting/waiting';
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
  fAppPosition: number;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider) {
      
    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

  }

  startFapp() {

    let options: FAppOptions = {
      name: "SweepAsync",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
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

  forceFapp() {
    let options: FAppOptions = {
      name: "SweepAsync",
      params: {}
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }
}
