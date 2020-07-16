import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket;

  connect() {
    this.socket = webSocket(environment.webSocketAdress);
  }

  init() {
    this.connect();
  }

  sendMessage(msg: any) { // TODO : We can change any maybe
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
