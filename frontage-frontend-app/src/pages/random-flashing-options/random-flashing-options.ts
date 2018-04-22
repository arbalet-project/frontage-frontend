import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
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
  fAppOptions: any;
  joystickPage: any = RandomFlashingJoystickPage;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider) {

    this.isAdmin = this.localStorageProvider.isAdmin();

    //Init the flag options to send to the back
    this.fAppOptions = {
      name: "RandomFlashing",
      params: {
        colors: this.selectedParameter
      }
    }
  }
}

