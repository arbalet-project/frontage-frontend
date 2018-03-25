import { Injectable } from '@angular/core';
import { environment } from '../../app/environment';

/*
  Generated class for the WebSocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSocketProvider {

  url: string = `${environment.webSocketAdress}`;

  constructor() { }

  public getSocket(): WebSocket {
    let socket: WebSocket = undefined;

    try {
      let socket: WebSocket = new WebSocket(this.url);

      socket.onopen = function () {
        socket.send("{msg:Connection ok}");
      };

      socket.onerror = function (e) {
        alert("Socket Error !");
        alert(JSON.stringify(e));
      };
    } catch (e) {
      alert("Impossible de créer la socket")
      alert(JSON.stringify(e))
    }

    return socket;
  }
}
