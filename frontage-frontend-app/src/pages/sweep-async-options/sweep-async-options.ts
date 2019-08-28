import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SweepAsyncJoystickPage } from '../sweep-async-joystick/sweep-async-joystick';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-sweep-async-options',
  templateUrl: 'sweep-async-options.html',
})
export class SweepAsyncOptionsPage {
  fAppPosition: number;
  isAdmin: boolean = false;
  fAppOptions: any;
  joystickPage: any = SweepAsyncJoystickPage;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider,
    public tracker: TrackingProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
    this.tracker.selectEvent("SweepAsync");
    //Init the flag options to send to the back
    this.fAppOptions = {
      name: "SweepAsync",
    }
  }
}
