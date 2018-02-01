import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  selectedParam: string;
  paramsList: any;

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wsProvider: WebSocketProvider) {
    let joystickParams = navParams.get('joystickParams');
    this.paramsList = joystickParams.paramsList;
    this.selectedParam = joystickParams.current;

    this.socket = this.wsProvider.getSocket();

    this.socket.onmessage = function (message) {
      console.log(message);
      return message;
    };
  }

  sendOption() {

    this.socket.send("{payload: {flag:'" + this.selectedParam + "'}}");
  }


}
