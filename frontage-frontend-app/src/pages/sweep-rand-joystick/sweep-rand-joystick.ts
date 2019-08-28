import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-sweep-rand-joystick',
  templateUrl: 'sweep-rand-joystick.html',
})
export class SweepRandJoystickPage {

  selectedParameter: string;
  parametersList: string[];
  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler:WebsocketMessageHandlerProvider,
    public tracker: TrackingProvider) {

    let joystickParams = navParams.get('joystickParams');

    this.tracker.playEvent("SweepRand");
    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  sendOption(option) {
    this.websocketMessageHandler.send('{"uapp":"' + this.selectedParameter + '"}');
  }

  ionViewDidLeave() {
    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    this.websocketMessageHandler.stopKeepAliveSender();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
