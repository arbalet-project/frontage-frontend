import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Subscription, Observable, interval } from 'rxjs';
import { FAppService } from '../api/app.service';
import { receiveMessageOnPort } from 'worker_threads';
import { AuthenticationService } from '../authentication/authentication.service';
import { cpuUsage } from 'process';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

enum CODE {
  CLOSE_APP = 1,
  GAME_OVER = 2,
  EXPIRE = 3,
  EXPIRE_SOON = 4,
  TETRIS_CLEARED_ROW = 10,
  SNAKE_ATE_APPLE = 11,
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket: WebSocketSubject<any>; // TODO : Try to understand why any
  public keepAliveSub: Subscription;

  constructor(public http: FAppService, public auth: AuthenticationService, public translate: TranslateService, public toast: ToastController) {
  }

  connect() {
    this.socket = webSocket({
      url: environment.webSocketAdress
    });
  }

  init() {
    this.connect();
    this.socket.subscribe((message) => {
      console.log(message);
      if (message.userid === this.auth.userid) {
        this.handleMessage(message);
      }
    }, err => console.error, () => console.log('finish'));

    this.keepAliveSub = interval(5000).subscribe(

      () => {
        this.http.keepAlive().subscribe((resp) => {
          if (resp.keepAlive) {
            // TODO : Show app something ! 
          }
        });
      }
    );

    //   this.interruptedApp = resp["keepAlive"] == false;
    //   if(this.interruptedApp && !this.popupDisplayed && this.mustKeepAlive) {
    //     this.showPopUp("CLOSE_APP_TITLE", "GET_OUT", navCtrl);
    //     this.vibration.vibrate([100, 100, 100, 100, 600]);

  }

  handleMessage(message: any) { // Change this any !
    switch (message.code) {
      case CODE.EXPIRE_SOON:
        this.presentToast('message.expire_soon');
        break;
      case CODE.EXPIRE:
        break;
      case CODE.CLOSE_APP:
        break;
      default:
        console.error("error");
      // TODO
    }
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
    this.keepAliveSub.unsubscribe();
  }

  async presentToast(messageKey : string) {
    const toast = await this.toast.create({
      message: this.translate.instant(messageKey),
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }
}
