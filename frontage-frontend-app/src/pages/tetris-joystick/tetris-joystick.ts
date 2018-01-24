import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TetrisJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tetris-joystick',
  templateUrl: 'tetris-joystick.html',
})
export class TetrisJoystickPage {
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
      self.socket.send("coucou, c'est " + self.nom);
    };

    this.socket.onerror = function () {
      console.log("Erreur, la connection a échouée.");
    }
  }

  onUp() {
    this.socket.send("^");
  }
  onDown() {
    this.socket.send("v");
  }
  onLeft() {
    this.socket.send("<");
  }
  onRight() {
    this.socket.send(">");
  }
}
