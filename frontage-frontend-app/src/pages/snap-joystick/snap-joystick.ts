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
  socket: WebSocket;

  updateListSubscription: Subscription;
  isWaiting: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider, public http: HttpClient) {

    this.baseUrl = `${environment.snapBaseUrl}`;

    this.updateListSubscription = Observable.interval(200)
      .subscribe(x => this.updateList(x));
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
        response => alert("send " + body + " et receive " + JSON.stringify(response) + " |test " + JSON.stringify(this.selectedClient)),
        err => alert("error : " + JSON.stringify(err))
      );
  }

  ionViewWillAppear() {
    this.isWaiting = false;
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
    if (this.updateListSubscription) {
      this.updateListSubscription.unsubscribe();

      this.updateListSubscription = undefined;
    }
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
