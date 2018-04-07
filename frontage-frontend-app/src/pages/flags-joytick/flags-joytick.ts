import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler:WebsocketMessageHandlerProvider) {
    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    this.initSocket();
  }

  initSocket() {
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    let self = this;
    this.socket.onmessage = message => self.websocketMessageHandler.handleMessage(message, this.navCtrl, this);

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Flags : Erreur, la connexion websocket a échouée."
    }
  }

  sendOption(){
    this.socket.send('{"flag": "' + this.selectedParameter + '"}');
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
  }

}
