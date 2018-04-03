import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { environment } from './../../app/environment';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SnapJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snap-joystick',
  templateUrl: 'snap-joystick.html',
})
export class SnapJoystickPage {
  selectedParameter: string;
  parametersList: string[];

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider:DataFAppsProvider) {
    let joystickParams = navParams.get('joystickParams');

    alert(JSON.stringify(joystickParams))
    this.initSocket();
  }

  initSocket() {

    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Snap : Erreur, la connexion websocket a échouée."
    }
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
  }

  quitPage() {
    this.navCtrl.pop();
  }
}
