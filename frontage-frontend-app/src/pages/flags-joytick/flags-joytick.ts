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

  constructor(public navCtrl: NavController, public navParams: NavParams, public wsProvider: WebSocketProvider) {
    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    console.log("les params : " + JSON.stringify(this.selectedParameter));

    this.socket = this.wsProvider.getSocket();

    this.socket.onmessage = function (message) {
      return message;
    };
  }

  sendOption() {
    this.socket.send("{payload: {flag:'" + this.parametersList + "'}}");
  }


}
