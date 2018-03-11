import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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

  constructor(public navParams: NavParams, public screenOrientation: ScreenOrientation, public localStorageProvider: LocalStorageProvider ) {
    console.log("tetris joystick");
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.nom = localStorageProvider.getUserName();

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
  turn() {
    this.socket.send("@");
  }

  ionViewDidLeave(){
    this.quitPage();
  }

  backButtonAction(){
    this.quitPage();
  }

  quitPage(){
    this.socket.send("q");
    this.screenOrientation.unlock();
  }
}
