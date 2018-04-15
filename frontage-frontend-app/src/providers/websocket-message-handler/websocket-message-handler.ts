import { environment } from './../../app/environment';
import { TranslateService } from '@ngx-translate/core'
import { Vibration } from '@ionic-native/vibration';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

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

  socket: WebSocket;

  constructor(private alertCtrl: AlertController, public vibration: Vibration, public tranlation: TranslateService, public toastCtrl:ToastController) {
  }

  initSocket(navCtrl, page) {

    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    let self = this;
    this.socket.onmessage = message => self.handleMessage(message, navCtrl, page);

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Erreur, la connexion websocket a échouée."
    }
  }

  handleMessage(message, navCtrl, page) {
    let data = JSON.parse(message.data);

    if (data.code == this.CODE_GAME_OVER) {
      page.isGameOver = true;
      this.showPopUp("GAME_OVER_TITLE", "GAME_OVER", navCtrl);
      this.vibration.vibrate([1000, 100, 1000, 100, 1000]);
    } else if (data.code == this.CODE_CLOSE_APP) {
      this.showPopUp("CLOSE_APP_TITLE", "GET_OUT", navCtrl);
    } else if (data.code == this.CODE_EXPIRE) {
      this.showToast("EXPIRE");
    } else if (data.code == this.CODE_EXPIRE_SOON) {
      // page.expireSoon = true;
      // alert("expire soon");
    } else {
      // alert("Les data : " + message);
      console.log("data :");
      console.log(data);
      console.log(message.data);
      // alert("L'erreur :" + erreur);
      // alert("L'erreur message : " + message.message);
      // this.showPopUp("UNKNOWN_CODE_TITLE", "UNKNOWN_MESSAGE", navCtrl);
    }
  }

  showToast(messageKey) {
    let content = this.getTranslation(messageKey);

    let toast = this.toastCtrl.create({
      message: content,
      duration: 4000,
      position: 'top'
    });

    toast.setShowCloseButton(true);

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
    this.vibration.vibrate([1000]);
  }

  showPopUp(titleKey, messageKey, navCtrl) {

    let popUp = this.alertCtrl.create({
      title: this.getTranslation(titleKey),
      message: this.getTranslation(messageKey),
      buttons: [{
        text: 'Ok',
        handler: () => {
          popUp.dismiss().then(() => {
              navCtrl.pop();
          });
          return false;
        }
      }]
    });

    popUp.present();
  }

  getTranslation(key){
    let content = "";
    this.tranlation.get(key).subscribe(t => {
      content = t;
    });

    return content;
  }

  send(message){
    this.socket.send(message);
  }

}
