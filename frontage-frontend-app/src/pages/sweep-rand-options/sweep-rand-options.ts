import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { SweepRandJoystickPage } from '../sweep-rand-joystick/sweep-rand-joystick';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-sweep-rand-options',
  templateUrl: 'sweep-rand-options.html',
})
export class SweepRandOptionsPage {
  fAppPosition: number;
  parametersList: string[] = ["road", "gender", "cold", "warm"];

  isAdmin: boolean = false;

  joystickPage: any = SweepRandJoystickPage;
  fAppOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider,
    public adminProvider: AdminProvider, public localStorageProvider: LocalStorageProvider,
    public tracker: TrackingProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
    this.tracker.selectEvent("SweepRand");
    //Init the flag options to send to the back
    this.fAppOptions = {
      name: "SweepRand",
      params: {
        uapp: "gender"
      }
    }
  }
}
