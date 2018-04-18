import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
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
  isClosedExternaly: Boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fAppProvider: DataFAppsProvider, public websocketMessageHandler:WebsocketMessageHandlerProvider) {

    websocketMessageHandler.initSocket(navCtrl, this);
  }

  ionViewDidLeave() {
    if (!this.isClosedExternaly) {
      this.fAppProvider.stopApp();
    }
  }

  ionViewWillEnter(){
    this.isClosedExternaly = false;
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
