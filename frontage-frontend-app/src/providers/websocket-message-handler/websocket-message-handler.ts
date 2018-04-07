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

  constructor(private alertCtrl: AlertController, public vibration: Vibration, public tranlation:TranslateService) {
    console.log('Hello WebsocketMessageHandlerProvider Provider');
  }

  handleMessage(message) {
    let data = JSON.parse(message.data);

    let title:string;
    let message_displayed:string;
    let popUpContent:any = {};

    if (data.code == this.CODE_GAME_OVER) {
        title= "GAME_OVER_TITLE",
        message_displayed= "GET_OUT"
      this.vibration.vibrate([1000, 100, 1000, 100, 1000]);
    }else if (data.code == this.CODE_CLOSE_APP) {
        title= "CLOSE_APP_TITLE",
        message_displayed= "GAME_OVER"
    }else if (data.code == this.CODE_GAME_OVER) {
        title= "CODE_EXPIRE_TITLE",
        message_displayed= "EXPIRE"
    }else if (data.code == this.CODE_EXPIRE_SOON) {
        title= 'EXPIRE_SOON_TITLE',
        message_displayed= "EXPIRE_SOON"
    }else{
        title= "UNKNOWN_CODE_TITLE",
        message_displayed= "UNKNOWN_MESSAGE"
    }

    this.tranlation.get(title).subscribe(t => {
      popUpContent.title = t;
    });
    this.tranlation.get(message_displayed).subscribe(t => {
      popUpContent.message = t;
    });
    popUpContent.buttons = ['Ok']

    let popUp = this.alertCtrl.create(popUpContent);

    popUp.present();
  }
}
