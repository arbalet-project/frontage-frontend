import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { SnakeJoystickPage } from './../snake-joystick/snake-joystick';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-snake-options',
  templateUrl: 'snake-options.html',
})
export class SnakeOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController,
    public dataFAppsProvider: DataFAppsProvider,
    public formBuilder: FormBuilder,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  launchApp() {

    let options = {
      name: "Snake",
    }

    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: SnakeJoystickPage });
  }

  forceFapp() {
    let options = {
      name: "Snake",
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }
}
