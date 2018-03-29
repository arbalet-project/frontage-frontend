import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  selectedParameter: string;
  parametersList: string[];

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wsProvider: WebSocketProvider, public fAppProvider: DataFAppsProvider) {
    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    this.socket = this.wsProvider.getSocket();

    this.socket.onmessage = function (message) {
      return message;
    };
  }

  changeFlag(){
    this.socket.send("{flag:'" + this.selectedParameter + "'}");
  }

  stopFApp() {
    this.fAppProvider.stopApp();
    this.navCtrl.pop();
  }

}
