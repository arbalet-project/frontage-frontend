import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Subscription, Observable, interval } from 'rxjs';
import { FAppService } from '../api/app.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket: WebSocketSubject<any>; // TODO : Try to understand why any
  public keepAliveSub: Subscription;

  constructor(public http: FAppService) {
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
    }, err => console.error, () => console.log('finish'));

    this.keepAliveSub = interval(5000).subscribe(
     
      () => {
        this.http.keepAlive().subscribe((resp) => {
          if(resp.keepAlive) {
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

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
    this.keepAliveSub.unsubscribe();
  }
}
