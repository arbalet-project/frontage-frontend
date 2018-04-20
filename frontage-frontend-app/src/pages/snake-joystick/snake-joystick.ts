import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
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
  isExpireSoon: Boolean = false;

  isGameOver: Boolean = false;
  

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navCtrl: NavController,
    public navParams: NavParams, public screenOrientation: ScreenOrientation,
    public localStorageProvider: LocalStorageProvider,
    public fAppProvider: DataFAppsProvider,
    public platform: Platform,
    public vibration: Vibration,
    public websocketMessageHandler: WebsocketMessageHandlerProvider) {

    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.nom = localStorageProvider.getUserName();

    websocketMessageHandler.initSocket(navCtrl);
  }

  onUp() {
    this.websocketMessageHandler.send("^");
    this.vibration.vibrate(40);
  }
  onDown() {
    this.websocketMessageHandler.send("v");
    this.vibration.vibrate(40);
  }
  onLeft() {
    this.websocketMessageHandler.send("<");
    this.vibration.vibrate(40);
  }
  onRight() {
    this.websocketMessageHandler.send(">");
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
  }

  ionViewWillEnter() {
    this.isExpireSoon = false;
    this.isGameOver = false;
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  
}
