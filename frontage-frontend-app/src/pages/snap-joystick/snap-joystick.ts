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

  baseUrl:string;
  authorizeEndpoint:string = "/authorize";
  clientsEndpoint:string = "/clients";
  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider:DataFAppsProvider, public http: HttpClient) {

    this.baseUrl = `${environment.snapBaseUrl}`;
  }

  getClientsInfo() {
    this.http.get<any>(this.baseUrl + this.clientsEndpoint)
    .subscribe(
      response => this.handleResponse(response)
    );
  }

  handleResponse(response){
    alert(JSON.stringify(response));
    
    this.selectedClient=response.selected_client;
    this.clientsList=response.list_clients;
  }

  ionViewDidLeave() {
    this.fAppProvider.stopApp();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
