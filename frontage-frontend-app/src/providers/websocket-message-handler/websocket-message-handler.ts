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

  constructor(private alertCtrl: AlertController, public vibration: Vibration, public tranlation: TranslateService) {
    console.log('Hello WebsocketMessageHandlerProvider Provider');
  }

  handleMessage(message, navCtrl, page) {
    let data = JSON.parse(message.data);

    let title: string;
    let message_displayed: string;
    
    let output = this.CODE_GAME_OVER;

    if (data.code == this.CODE_GAME_OVER) {
      this.showPopUp("GAME_OVER_TITLE", "GAME_OVER");
      navCtrl.pop();
      this.vibration.vibrate([1000, 100, 1000, 100, 1000]);
    } else if (data.code == this.CODE_CLOSE_APP) {
      this.showPopUp("CLOSE_APP_TITLE", "GET_OUT");
      navCtrl.pop();
    } else if (data.code == this.CODE_EXPIRE) {
      this.showPopUp("CODE_EXPIRE_TITLE", "EXPIRE")
      navCtrl.pop();
    } else if (data.code == this.CODE_EXPIRE_SOON) {
      page.expireSoon = true;
    } else {
      this.showPopUp("UNKNOWN_CODE_TITLE", "UNKNOWN_MESSAGE");
      navCtrl.pop();
    }

    
  }

  showPopUp(titleKey, messageKey){
    let popUpContent: any = {};
    
    this.tranlation.get(titleKey).subscribe(t => {
      popUpContent.title = t;
    });
    this.tranlation.get(messageKey).subscribe(t => {
      popUpContent.message = t;
    });

    popUpContent.buttons = [{
      text: 'Ok',
      handler: () => {
        let navTransition = popUp.dismiss();
      }
    }]

    let popUp = this.alertCtrl.create(popUpContent);

    popUp.present();
  }
}
