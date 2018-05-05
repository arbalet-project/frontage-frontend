import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Dialogs } from '@ionic-native/dialogs';
import { Vibration } from '@ionic-native/vibration';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';



@Component({
  selector: 'page-tetris-joystick',
  templateUrl: 'tetris-joystick.html',
})
export class TetrisJoystickPage {
  nom: string = "";
  isExpireSoon: Boolean = false;

  isGameOver: Boolean = false;

  constructor(public navParams: NavParams,
    public screenOrientation: ScreenOrientation,
    public navCtrl: NavController,
    public localStorageProvider: LocalStorageProvider,
    public fAppProvider: DataFAppsProvider,
    public platform: Platform,
    public vibration: Vibration,
    public dialogs: Dialogs,
    public websocketMessageHandler: WebsocketMessageHandlerProvider) {

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.nom = localStorageProvider.getUserName();

    websocketMessageHandler.initSocket(navCtrl);
  }

  onDown() {
    this.websocketMessageHandler.send("<");
    this.vibration.vibrate(40);
  }
  onUp() {
    this.websocketMessageHandler.send(">");
    this.vibration.vibrate(40);
  }
  onRight() {
    this.websocketMessageHandler.send("v");
    this.vibration.vibrate(40);
  }
  turn() {
    this.websocketMessageHandler.send("^");
    this.vibration.vibrate(40);
  }

  ionViewDidLeave() {
    if (!this.isGameOver && !this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
    }
    
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
    this.websocketMessageHandler.stopKeepAliveSender();
  }

  ionViewWillEnter() {
    this.isExpireSoon = false;
    this.isGameOver = false;
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
