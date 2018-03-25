import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-tetris-joystick',
  templateUrl: 'tetris-joystick.html',
})
export class TetrisJoystickPage {
  nom:string = "";
  socket:WebSocket;

  constructor(public navParams: NavParams, public screenOrientation: ScreenOrientation, public navCtrl: NavController, 
    public localStorageProvider: LocalStorageProvider, public fAppProvider:DataFAppsProvider) {

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
      self.socket.send("coucou, c'est " + self.nom);
    };

    this.socket.onerror = function () {
      throw "Tetris Joystick : Erreur, la connexion websocket a échouée."
    }
  }

  onDown() {
    this.socket.send("<");
  }
  onUp() {
    this.socket.send(">");
  }
  onRight() {
    this.socket.send("v");
  }
  turn() {
    this.socket.send("^");
  }

  ionViewDidLeave(){
    this.quitPage();
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  quitPage(){
    this.fAppProvider.stopApp();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
  }
}
