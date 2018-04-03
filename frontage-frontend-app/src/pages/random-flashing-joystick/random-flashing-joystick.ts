import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-random-flashing-joystick',
  templateUrl: 'random-flashing-joystick.html',
})
export class RandomFlashingJoystickPage {

  socket: WebSocket;
  selectedParameter: string;
  parametersList: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider:DataFAppsProvider) {

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

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
      throw "Random-Flashing : Erreur, la connexion websocket a échouée."
    }
  }

  sendOption(option) {
    this.socket.send('{"color":"' + this.selectedParameter + '"}');
  }

  ionViewDidLeave(){
    this.fAppProvider.stopApp();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
  
}
