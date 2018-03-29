import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { environment } from '../../app/environment';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';

@Component({
  selector: 'page-snake-joystick',
  templateUrl: 'snake-joystick.html',
})
export class SnakeJoystickPage {

  nom: string = "";
  socket: WebSocket;

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navCtrl: NavController, public navParams: NavParams,
    public screenOrientation: ScreenOrientation, public localStorageProvider: LocalStorageProvider, public fAppProvider: DataFAppsProvider, public platform: Platform) {
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
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
      throw "Tetris Snake : Erreur, la connexion websocket a échouée."
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

  ionViewDidLeave() {
    this.quitPage();
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  quitPage() {
    this.fAppProvider.stopApp();
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
  }
}
