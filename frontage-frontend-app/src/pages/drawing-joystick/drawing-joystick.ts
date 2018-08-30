import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-drawing-joystick',
  templateUrl: 'drawing-joystick.html',
})
export class DrawingJoystickPage {

  parametersList: string;
  selectedParameter: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider) {

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  sendColor(truc) {

    console.log(JSON.stringify(truc))
    // let colors = {red:255, blue:255, green:255}
    // this.websocketMessageHandler.send(JSON.stringify(colors))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawingJoystickPage')
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  ionViewDidLeave() {

    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    this.websocketMessageHandler.stopKeepAliveSender();
  }
}
