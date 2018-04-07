import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { SweepRandJoystickPage } from '../sweep-rand-joystick/sweep-rand-joystick';

@Component({
  selector: 'page-sweep-rand-options',
  templateUrl: 'sweep-rand-options.html',
})
export class SweepRandOptionsPage {
  fAppPosition: number;
  parametersList: string[] = ["african", "gender", "teddy", "warm"];
  selectedParameter: string = "african";

  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider,
    public adminProvider: AdminProvider, public localStorageProvider: LocalStorageProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
  }

  startFapp() {

    let options = {
      name: "SweepRand",
      params: {
        uapp: this.selectedParameter
      }
    }


    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: SweepRandJoystickPage, joystickParams: { parametersList: this.parametersList, selectedParameter: this.selectedParameter } });
  }

  forceFapp() {
    let options = {
      name: "SweepRand",
      params: {}
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }

  sendScheduledFappOptions() {
    let options = {
      name: "SweepRand",
      params: {
        uapp: this.selectedParameter
      }
    };

    this.adminProvider.sendScheduledFAppOptions(options)
      .subscribe(response => this.goToNextPage(response));
  }
}
