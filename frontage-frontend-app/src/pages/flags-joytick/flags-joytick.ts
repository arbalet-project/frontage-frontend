import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlagsJoytickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  testSocket() {

    let socket: WebSocket = new WebSocket("ws://192.168.1.23:8124");

    socket.onmessage = function (message) {
      console.log(message);
      return message;
    };

    socket.onopen = function () {
      console.log("connected !");
      socket.send("helloooooooo ! ");
    };
  }
}
