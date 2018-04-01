import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  selectedParameter: string;
  parametersList: string[];

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider) {
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
      throw "Flags : Erreur, la connexion websocket a échouée."
    }
  }

  changeFlag(){
    this.socket.send("{'flag':'" + this.selectedParameter + "'}");
  }

  quitPage() {
    this.fAppProvider.stopApp();
    this.navCtrl.pop();
  }

  ionViewDidLeave() {
    this.quitPage();
  }

}
