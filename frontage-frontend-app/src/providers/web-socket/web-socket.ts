import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../app/environment';

@Injectable()
export class WebSocketProvider {

  url: string = `${environment.webSocketAdress}`;

  constructor(public http: Http) { }

  public getSocket(): WebSocket {
    
    let socket: WebSocket = new WebSocket(this.url);
    
    socket.onopen = function () {
      console.log("connected !");
      socket.send("{msg:Connection ok}");
    };

    return socket;
  }
}
