import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-tetris-joystick',
  templateUrl: 'tetris-joystick.html',
})
export class TetrisJoystickPage {
  nom:string = "";
  socket:WebSocket;

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navParams: NavParams) {
    console.log("tetris joystick");

    this.nom = nicknameGeneratorProvider.generateNicknameFr();

    this.initSocket();
  }

  initSocket() {
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

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
  onTurn() {
    this.socket.send(">");
  }
}
