import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';

import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SnapJoystickPage } from '../snap-joystick/snap-joystick';

@Component({
  selector: 'page-snap-options',
  templateUrl: 'snap-options.html',
})
export class SnapOptionsPage {

  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider, public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
  }

  startFapp() {
    let options = {
      name: "Snap",
    };

    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {

    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: SnapJoystickPage })
  }

  forceFapp() {
    let options = {
      name: "Snap",
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }
}
