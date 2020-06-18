import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Vibration } from '@ionic-native/vibration';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { TrackingProvider } from '../../providers/tracking/tracking';
import * as $ from 'jquery'

@Component({
  selector: 'page-snake-joystick',
  templateUrl: 'snake-joystick.html',
})
export class SnakeJoystickPage {
  isExpireSoon: Boolean = false;
  isGameOver: Boolean = false;


  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navCtrl: NavController,
    public navParams: NavParams, public screenOrientation: ScreenOrientation,
    public localStorageProvider: LocalStorageProvider,
    public fAppProvider: DataFAppsProvider,
    public platform: Platform,
    public vibration: Vibration,
    public websocketMessageHandler: WebsocketMessageHandlerProvider,
    public tracker: TrackingProvider) {

    this.tracker.playEvent("Snake");
    if (this.platform.is('mobile')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    websocketMessageHandler.initSocket(navCtrl);
  }

  onUp() {
    this.websocketMessageHandler.send("^");
    this.vibration.vibrate(40);
    $('#upArrow').hide({duration:0, done: function() {$('#upArrow').fadeIn(200);}});
  }
  onDown() {
    this.websocketMessageHandler.send("v");
    this.vibration.vibrate(40);
    $('#downArrow').hide({duration:0, done: function() {$('#downArrow').fadeIn(200);}});
  }
  onLeft() {
    this.websocketMessageHandler.send("<");
    this.vibration.vibrate(40);
    $('#leftArrow').hide({duration:0, done: function() {$('#leftArrow').fadeIn(200);}});
  }
  onRight() {
    this.websocketMessageHandler.send(">");
    this.vibration.vibrate(40);
    $('#rightArrow').hide({duration:0, done: function() {$('#rightArrow').fadeIn(200);}});
  }

  ionViewDidLeave() {
    this.websocketMessageHandler.stopKeepAliveSender();

    if (!this.isGameOver && !this.websocketMessageHandler.isExternalyClosed()) {
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
