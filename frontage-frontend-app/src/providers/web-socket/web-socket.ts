import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Rx from 'rxjs/rx';

/*
  Generated class for the WebSocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSocketProvider {

  socket:Rx.Subject<MessageEvent>;

  constructor(public http: Http) {
    console.log('Hello WebSocketProvider Provider');
  }

  public connect(url): Rx.Subject<MessageEvent> {
    if(!this.socket) {
      // this.socket = this.create(url);
    }
    return this.socket;
  }

  private create(url: string) {
    let ws = new WebSocket(url);

    ws.onerror = function (error) {
      console.log(JSON.stringify(error));
    };

    ws.onmessage = function (message) {
      console.log(JSON.stringify(message));
    };

    ws.onclose = function () {
      console.log("Close");
    };

    // let observable = Rx.Observable.create(
    //   (obs: Rx.Observer<MessageEvent>) => {
    //     ws.onmessage = obs.next.bind(obs);
    //     ws.onerror = obs.error.bind(obs);
    //     ws.onclose = obs.complete.bind(obs);
    //     return ws.close.bind(ws);
    //   }
    // );

    // let observer = {
    //   next: (data: Object) => {
    //     if (ws.readyState === WebSocket.OPEN) {
    //       ws.send(JSON.stringify(data));
    //     }
    //   },
    // };
    
    // return Rx.Subject.create(observer, observable);
  }
}
