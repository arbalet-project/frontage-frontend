import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WebSocketProvider {

  url: string = "ws://192.168.1.23:8124";

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
