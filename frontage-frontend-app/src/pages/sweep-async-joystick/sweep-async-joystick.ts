import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { environment } from '../../app/environment';

@Component({
  selector: 'page-sweep-async-joystick',
  templateUrl: 'sweep-async-joystick.html',
})
export class SweepAsyncJoystickPage {

  fAppOptions: FormGroup;
  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public wsProvider: WebSocketProvider,
                public fAppProvider:DataFAppsProvider) {

    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });

    this.initSocket();
  }

  initSocket() {

    this.socket = new WebSocket(`${environment.webSocketAdress}`);

    this.socket.onmessage = function (message) {
      return message;
    };

    this.socket.onopen = function () {
    };

    this.socket.onerror = function () {
      throw "Sweep-Async : Erreur, la connexion websocket a échouée."
    }
  }

  sendOption(option) {
    this.socket.send('{"color":' + this.fAppOptions.value.fAppColor + "'}");
  }

  ionViewDidLeave(){
    this.quitPage()
  }

  quitPage() {
    this.fAppProvider.stopApp();
    this.navCtrl.pop();
  }
}
