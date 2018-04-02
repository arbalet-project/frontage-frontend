import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-sweep-async-joystick',
  templateUrl: 'sweep-async-joystick.html',
})
export class SweepAsyncJoystickPage {

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
                public fAppProvider:DataFAppsProvider) {

  }

  initSocket() {

    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Sweep-Async : Erreur, la connexion websocket a échouée."
    }
  }

  ionViewDidLeave(){
    this.fAppProvider.stopApp();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
