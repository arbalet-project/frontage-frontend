import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the SnakesJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snake-joystick',
  templateUrl: 'snake-joystick.html',
})
export class SnakeJoystickPage {

  nom:string = "";
  socket:WebSocket;

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navParams: NavParams) {
    this.nom = nicknameGeneratorProvider.generateNicknameFr();

    this.initSocket();
  }

  initSocket() {
    
    this.socket = new WebSocket("ws://192.168.1.23:8124");

    this.socket.onmessage = function (message) {
      console.log(message);
      return message;
    };

    let self = this;
    this.socket.onopen = function () {
      console.log("connected !");
    };
  }

  onUp() {
    this.socket.send("^");
  }

  onDown() {
    this.socket.send("^");
  }
  onLeft() {
    this.socket.send("^");
  }
  onRight() {
    this.socket.send("^");
  }
}
