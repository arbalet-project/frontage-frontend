import { DataFAppsProvider } from './../data-f-apps/data-f-apps';
import { LocalStorageProvider } from './../local-storage/local-storage';
import { environment } from './../../app/environment';
import { TranslateService } from '@ngx-translate/core'
import { Vibration } from '@ionic-native/vibration';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

/*
  Generated class for the WebsocketMessageHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketMessageHandlerProvider {
  CODE_CLOSE_APP = "1"
  CODE_GAME_OVER = "2"
  CODE_EXPIRE = "3"
  CODE_EXPIRE_SOON = "4"
  CODE_TETRIS_CLEARED_ROW = "10"
  CODE_SNAKE_ATE_APPLE = "11"

  socket: WebSocket;
  interruptedApp: Boolean = false;

  retryCounter = 0;
  externalClose: Boolean = false;
  popupDisplayed : Boolean = false;
  keepAliveSender: Subscription = undefined;

  pixelsDown: String = "";


  constructor(private alertCtrl: AlertController, public vibration: Vibration, public tranlation: TranslateService,
    public toastCtrl: ToastController, public localStorage: LocalStorageProvider, public appProvider: DataFAppsProvider) {
  }

  initSocket(navCtrl) {
    this.externalClose = false;
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    let self = this;
    this.socket.onmessage = message => self.handleMessage(message, navCtrl);

    this.socket.onopen = function () {
      self.retryCounter = 0
    }

    this.socket.onerror = function () {
      if (self.retryCounter < 10) {
        self.retryCounter += 1;
        setTimeout(() => self.initSocket(navCtrl), 300);
      } else {
        console.log("Can't establish a websocket connection");
      }
    }

    this.stopKeepAliveSender()  // Enforce closure before reopening
    this.keepAliveSender = Observable.interval(5000).subscribe(
      () => this.mustKeepAlive().subscribe(resp => {
        this.interruptedApp = resp["keepAlive"] == false;
        // Testing ==false instead of ==true gives the chance to recover after a temporary network failure
        if(this.interruptedApp && !this.popupDisplayed && this.mustKeepAlive) {
          this.stopKeepAliveSender();
          this.showPopUp("CLOSE_APP_TITLE", "GET_OUT", navCtrl);
          this.vibration.vibrate([100, 100, 100, 100, 600]);
        }
      }, e => console.log(e)),
      e => console.log(e));
    
    return this.socket;
  }

  isExternalyClosed(): Boolean {
    return this.externalClose;
  }

  isInterruptedApp(): Boolean {
    return this.interruptedApp;
  }

  resetFlags() {
    this.interruptedApp = false;
  }

  handleMessage(message, navCtrl) {
    let data = JSON.parse(message.data);

    if (data.message == "Pixel down message") {
        this.pixelsDown = data.code;
    }

    if (data.userid == this.localStorage.getUserId()) {
      if (data.code == this.CODE_GAME_OVER && !this.popupDisplayed) {
        this.showPopUp("GAME_OVER_TITLE", "GAME_OVER", navCtrl);
        this.vibration.vibrate([100, 100, 100, 100, 1500]);
      } else if (data.code == this.CODE_CLOSE_APP && !this.popupDisplayed) {
        this.showPopUp("CLOSE_APP_TITLE", "GET_OUT", navCtrl);
        this.vibration.vibrate([100, 100, 100, 100, 600]);
        this.interruptedApp = true;
      } else if (data.code == this.CODE_EXPIRE && !this.popupDisplayed) {
        this.showPopUp("CODE_EXPIRE_TITLE", "EXPIRE", navCtrl);
        this.vibration.vibrate([100, 100, 100, 100, 1500]);
      } else if (data.code == this.CODE_EXPIRE_SOON) {
        this.showToast("EXPIRE_SOON");
      } else if (data.code == this.CODE_TETRIS_CLEARED_ROW) {
        this.vibration.vibrate([100, 100, 100]);
      } else if (data.code == this.CODE_SNAKE_ATE_APPLE) {
        this.vibration.vibrate(100);
      } else if(!this.popupDisplayed) {
        this.showPopUp("UNKNOWN_CODE_TITLE", "UNKNOWN_MESSAGE", navCtrl);
      }
    }
  }

  showToast(messageKey) {
    let content = this.getTranslation(messageKey);

    let toast = this.toastCtrl.create({
      message: content,
      duration: 4000,
      position: 'top'
    });

    toast.present();
    this.vibration.vibrate([100, 100, 100, 100, 600]);
  }

  showPopUp(titleKey, messageKey, navCtrl) {
    this.closeSocket();
    this.stopKeepAliveSender();
    this.externalClose = true;
    this.popupDisplayed = true;

    let popUp = this.alertCtrl.create({
      title: this.getTranslation(titleKey),
      message: this.getTranslation(messageKey),
      enableBackdropDismiss: true,
      buttons: [{
        text: 'Ok',
        handler: () => {
          popUp.dismiss().then(() => {
            navCtrl.pop();
            this.popupDisplayed = false;
          });
          return false;
        }
      }]
    });

    popUp.present();
  }

  getTranslation(key) {
    let content = "";
    this.tranlation.get(key).subscribe(t => {
      content = t;
    });

    return content;
  }

  send(message) {
    if (this.socket) {
      this.socket.send(message);
    }
  }

  closeSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }
  }

  mustKeepAlive() {
    return this.appProvider.mustKeepAlive();
  }

  stopKeepAliveSender() {
    if (this.keepAliveSender) {
      this.keepAliveSender.unsubscribe()
      this.keepAliveSender = undefined;
    }
  }





  // i dont know if it's the right way to do it, but right now i just want it
  // to work
  getPixelsDown() {
      if (this.pixelsDown != "") {
          let down = this.pixelsDown;
          this.pixelsDown = "";
          return down;
      }
      else {
          return "-1";
      }
  }
}
