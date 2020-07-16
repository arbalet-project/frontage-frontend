import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { serialize } from 'v8';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket: WebSocketSubject<any>; // TODO : Try to understand why any

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
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
