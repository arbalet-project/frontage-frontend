import { environment } from './../../app/environment';
import { TranslateService } from '@ngx-translate/core'
import { Vibration } from '@ionic-native/vibration';
import { AlertController } from 'ionic-angular';
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

  constructor(private alertCtrl: AlertController, public vibration: Vibration, public tranlation: TranslateService) {
  }

  initSocket(navCtrl, page) {
    
    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    let self = this;
    this.socket.onmessage = message => self.handleMessage(message, navCtrl, page);

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Flags : Erreur, la connexion websocket a échouée."
    }
  }

  handleMessage(message, navCtrl, page) {
    let data = JSON.parse(message.data);

    let title: string;
    let message_displayed: string;
    
    let output = this.CODE_GAME_OVER;

    if (data.code == this.CODE_GAME_OVER) {
      this.showPopUp("GAME_OVER_TITLE", "GAME_OVER", navCtrl);
      this.vibration.vibrate([1000, 100, 1000, 100, 1000]);
    } else if (data.code == this.CODE_CLOSE_APP) {
      this.showPopUp("CLOSE_APP_TITLE", "GET_OUT", navCtrl);
    } else if (data.code == this.CODE_EXPIRE) {
      this.showPopUp("CODE_EXPIRE_TITLE", "EXPIRE", navCtrl)
    } else if (data.code == this.CODE_EXPIRE_SOON) {
      page.expireSoon = true;
    } else {
      this.showPopUp("UNKNOWN_CODE_TITLE", "UNKNOWN_MESSAGE", navCtrl);

    }

    
  }

  showPopUp(titleKey, messageKey, navCtrl){
    let title:string;
    let message:string;
    let button:any = {};
    
    this.tranlation.get(titleKey).subscribe(t => {
      title = t;
    });
    this.tranlation.get(messageKey).subscribe(t => {
      message = t;
    });
    
    let popUp = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          let navTransition = popUp.dismiss();
          navTransition.then(() => {
            navCtrl.pop();
          });
        }
      }]
    });

    popUp.present();
  }

}
