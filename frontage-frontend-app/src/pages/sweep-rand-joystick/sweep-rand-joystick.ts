import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-sweep-rand-joystick',
  templateUrl: 'sweep-rand-joystick.html',
})
export class SweepRandJoystickPage {

  fAppOptions: FormGroup;
  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public wsProvider: WebSocketProvider) {

    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });

    this.socket = this.wsProvider.getSocket();

    this.socket.onmessage = function (message) {
      return message;
    };
  }

  sendOption(option) {
    this.socket.send("{payload: {flag:'" + this.fAppOptions.value.fAppColor + "'}}");
  }

  ionViewDidLeave(){
    this.socket.send("q");
  }
}
