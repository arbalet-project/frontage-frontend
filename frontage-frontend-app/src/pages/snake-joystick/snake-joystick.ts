import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

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
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

    let self = this;
      this.socket.onopen = function () {
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
