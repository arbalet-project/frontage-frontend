import { Vibration } from '@ionic-native/vibration';
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

  isUpWhite: Boolean = false;
  isDownWhite: Boolean = false;
  isRightWhite: Boolean = false;
  isLeftWhite: Boolean = false;

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public screenOrientation: ScreenOrientation,
    public localStorageProvider: LocalStorageProvider,
    public fAppProvider: DataFAppsProvider,
    public platform: Platform,
    public vibration: Vibration) {
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
      throw "Snake : Erreur, la connexion websocket a échouée."
    }
  }

  onUp() {
    this.socket.send("^");
    // this.isUpWhite = true;
    this.vibration.vibrate(40);
  }
  onDown() {
    this.socket.send("v");
    // this.isDownWhite = true;
    this.vibration.vibrate(40);
  }
  onLeft() {
    this.socket.send("<");
    // this.isLeftWhite = true;
    this.vibration.vibrate(40);
  }
  onRight() {
    this.socket.send(">");
    // this.isRightWhite = true;
    this.vibration.vibrate(40);
  }

  switchBack(isWhite: Boolean) {
    isWhite = !isWhite;
  }
  switchBackUp() {
    this.isUpWhite = !this.isUpWhite
  }
  switchBackDown() {
    this.isDownWhite = !this.isDownWhite
  }
  switchBackLeft() {
    this.isLeftWhite = !this.isLeftWhite
  }
  switchBackRight() {
    this.isRightWhite = !this.isRightWhite
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
