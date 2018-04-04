import { Vibration } from '@ionic-native/vibration';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { environment } from '../../app/environment';


@Component({
  selector: 'page-tetris-joystick',
  templateUrl: 'tetris-joystick.html',
})
export class TetrisJoystickPage {
  nom:string = "";
  socket:WebSocket;

  isUpWhite:Boolean = false;
  isDownWhite:Boolean = false;
  isRightWhite:Boolean = false;
  isTurnLight:Boolean = false;

  constructor(public navParams: NavParams, public screenOrientation: ScreenOrientation, public navCtrl: NavController, 
              public localStorageProvider: LocalStorageProvider, public fAppProvider:DataFAppsProvider, public platform: Platform,
              public vibration: Vibration ) {

      if (this.platform.is('mobile')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
    this.nom = localStorageProvider.getUserName();

    this.initSocket();
  }

  initSocket() {
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      alert(message);
      alert(message.data);

      self.vibration.vibrate([1000, 100, 1000, 100, 1000]);
      return message;
    };

    let self = this;
    this.socket.onopen = function () {
      self.socket.send("coucou, c'est " + self.nom);
    };

    this.socket.onerror = function () {
      throw "Tetris Joystick : Erreur, la connexion websocket a échouée."
    }
  }

  onDown() {
    this.socket.send("<");
    this.vibration.vibrate(40);
  }
  onUp() {
    this.socket.send(">");
    this.vibration.vibrate(40);
  }
  onRight() {
    this.socket.send("v");
    this.vibration.vibrate(40);
  }
  turn() {
    this.socket.send("^");
    this.vibration.vibrate(40);
  }

  ionViewDidLeave(){
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
