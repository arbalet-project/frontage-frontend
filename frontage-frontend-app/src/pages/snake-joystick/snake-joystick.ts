import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { environment } from '../../app/environment';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';

@Component({
  selector: 'page-snake-joystick',
  templateUrl: 'snake-joystick.html',
})
export class SnakeJoystickPage {

  nom:string = "";
  socket:WebSocket;

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navCtrl: NavController, public navParams: NavParams, public screenOrientation: ScreenOrientation, public localStorageProvider: LocalStorageProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.nom = localStorageProvider.getUserName();

    this.initSocket();
  }

  initSocket() {
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

      this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      alert("la connection a échouée");
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

  ionViewDidLeave(){
    this.quitPage();
  }

  quitPage(){
    
    this.socket.send("q");
    this.screenOrientation.unlock();
  }
}
