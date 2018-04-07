import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AdminProvider } from './../../providers/admin/admin';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TetrisJoystickPage } from './../tetris-joystick/tetris-joystick';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tetris-options',
  templateUrl: 'tetris-options.html',
})
export class TetrisOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public formBuilder: FormBuilder,
    public adminProvider: AdminProvider,
    public localStorageProvider: LocalStorageProvider) {
      
    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();
  }

  launchApp() {

    let options = {
      name: "Tetris",
    }

    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: TetrisJoystickPage });
  }

  forceFapp() {
    let options = {
      name: "Tetris",
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }
}
