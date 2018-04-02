import { environment } from './../../app/environment';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-sweep-rand-joystick',
  templateUrl: 'sweep-rand-joystick.html',
})
export class SweepRandJoystickPage {

  selectedParameter: string;
  parametersList: string[];
  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider) {

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    // this.initSocket();
  }

  initSocket() {

    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Sweep-Rand : Erreur, la connexion websocket a échouée."
    }
  }

  sendOption(option) {
    this.socket.send('{type:"' + this.selectedParameter + '"}');
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
