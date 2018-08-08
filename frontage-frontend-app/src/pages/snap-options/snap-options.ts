import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';

import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SnapJoystickPage } from '../snap-joystick/snap-joystick';

@Component({
  selector: 'page-snap-options',
  templateUrl: 'snap-options.html',
})

export class SnapOptionsPage {

  isAdmin: boolean = false;
  fAppOptions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public websocketMessageHandlerProvider : WebsocketMessageHandlerProvider,
    public adminProvider: AdminProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

    this.fAppOptions = {
      name: "Snap"
    }
  }

  forceAndStartFapp() {
    // This is for Snap only, force the FApp and also display the client list
    this.websocketMessageHandlerProvider.resetFlags();
    this.adminProvider.launchForcedFApp(this.fAppOptions)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, { info: response, joystick: SnapJoystickPage })
  }
}
