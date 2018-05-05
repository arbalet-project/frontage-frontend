import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { Observable, Subscription } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { environment } from './../../app/environment';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SnapJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snap-joystick',
  templateUrl: 'snap-joystick.html',
})
export class SnapJoystickPage {
  selectedClient: string;
  clientsList: string[];

  baseUrl: string;
  authorizeEndpoint: string = "/authorize";
  clientsEndpoint: string = "/clients";

  updateListSubscription: Subscription;
  isWaiting: Boolean = false;
  isClosedExternaly: Boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider, public http: HttpClient,
    public websocketMessageHandler: WebsocketMessageHandlerProvider) {

    this.baseUrl = `${environment.snapBaseUrl}`;

    this.updateListSubscription = Observable.interval(200)
      .subscribe(x => this.updateList(x));

      websocketMessageHandler.initSocket(navCtrl);
  }

  updateList(x) {
    if (!this.isWaiting) {
      this.isWaiting = true;
      this.getClientsInfo();
    }
  }

  getClientsInfo() {
    this.http.get<any>(this.baseUrl + this.clientsEndpoint)
      .subscribe(
        response => this.handleResponse(response)
      );
  }

  handleResponse(response) {
    this.selectedClient = response.selected_client;
    this.clientsList = response.list_clients;
    this.isWaiting = false;
  }

  authorize() {
    let body = {
      selected_client: this.selectedClient
    };

    this.http.post<any>(this.baseUrl + this.authorizeEndpoint, body)
      .subscribe(
        response => console.log("ok"),
        err => this.handleError(err)
      );
  }

  handleError(err) {
    if (err.status) {
      alert("Désolé, ce client n'est plus connecté.");
    } else {
      throw "Le serveur à renvoyé une réponse inattendu : " + JSON.stringify(err)
    }
  }

  ionViewWillEnter() {
    this.isWaiting = false;
  }

  ionViewDidLeave() {
    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    if (this.updateListSubscription) {
      this.updateListSubscription.unsubscribe();
      this.updateListSubscription = undefined;
    }

    this.websocketMessageHandler.stopKeepAliveSender();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
