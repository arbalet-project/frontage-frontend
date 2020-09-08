import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Subscription, Observable, interval, Subject } from 'rxjs';
import { FAppService } from '../api/app.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { VibrationService } from '../plugins/vibration.service';

enum CodeWebsocket {
  CLOSE_APP = 1,
  GAME_OVER = 2,
  EXPIRE = 3,
  EXPIRE_SOON = 4,
  TETRIS_CLEARED_ROW = 10,
  SNAKE_ATE_APPLE = 11,
}

enum CodeSubscription {
  INTERRUPTED_APP = 1,
}

type messageSubscription = { code: number, body?: string };

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socket: WebSocketSubject<any>;
  public keepAliveSub: Subscription;
  public externalClose = false;

  constructor(
    public http: FAppService,
    public auth: AuthenticationService,
    public translate: TranslateService,
    public toast: ToastController,
    public alert: AlertController,
    public nav: NavController,
    public vibration: VibrationService
  ) { }

  connect() {
    this.socket = webSocket({
      url: environment.webSocketAdress,
    });
  }

  init() {
    this.connect();
    this.socket.subscribe(
      (message) => {
        console.log(message);
        if (message.userid === this.auth.userid) {
          this.handleMessage(message);
        }
      },
      (err) => console.error,
      () => console.log('finish')
    );

    this.keepAliveSub = interval(5000).subscribe(() => {
      this.http.keepAlive().subscribe((resp) => {
        if (!resp.keepAlive) {
          this.showAlert('message.close');
          this.vibration.vibrate();
        }
      });
    });
  }

  handleMessage(message: any) {
    // Change this any !
    switch (message.code) {
      case CodeWebsocket.EXPIRE_SOON:
        this.showToast('message.expire_soon');
        break;
      case CodeWebsocket.EXPIRE:
        this.showAlert('message.expire');
        this.vibration.vibrate();
        break;
      case CodeWebsocket.CLOSE_APP:
        this.showAlert('message.close');
        this.vibration.vibrate();
        break;
      case CodeWebsocket.SNAKE_ATE_APPLE:
        this.vibration.vibrate();
        break;
      case CodeWebsocket.GAME_OVER:
        this.showAlert('message.game_over');
        this.vibration.vibrate();
        break;
      case CodeWebsocket.TETRIS_CLEARED_ROW:
        this.vibration.vibrate();
        break;
      default:
        this.showAlert('message.unknown');
    }
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
    this.keepAliveSub.unsubscribe();
  }

  async showToast(messageKey: string) {
    const toast = await this.toast.create({
      message: this.translate.instant(messageKey),
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  async showAlert(key: string) {
    this.externalClose = true;
    const alert = await this.alert.create({
      header: this.translate.instant(key + '.title'),
      message: this.translate.instant(key + '.message'),
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
