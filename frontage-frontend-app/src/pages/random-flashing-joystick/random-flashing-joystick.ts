import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-random-flashing-joystick',
  templateUrl: 'random-flashing-joystick.html',
})
export class RandomFlashingJoystickPage {

  selectedParameter: string;
  parametersList: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider:DataFAppsProvider,
    public websocketMessageHandler:WebsocketMessageHandlerProvider) {

    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  sendOption() {
    this.websocketMessageHandler.send('{"colors":"' + this.selectedParameter + '"}');
  }

  ionViewDidLeave(){
    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
    }
  }
  
  stopFApp() {
    this.navCtrl.pop();
  }
}
