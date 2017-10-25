import { FAppListPage } from './../f-app-list/f-app-list';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  isUp: boolean;
  exception: any;
  token: string = "vide";

  constructor(public navCtrl: NavController, public authentication: AuthenticationProvider) {

    authentication.isUp().subscribe(response => this.isUp=response, e => this.handleError(e));

  }

  start() {
    this.authentication.refreshToken().then(response => this.toAppList());
  }

  toAppList() {
    console.log('Token : ' + JSON.stringify(this.authentication.getToken()));

    this.navCtrl.push(FAppListPage);
  }

  refreshTokenValue() {
    this.authentication.getToken();
  }

  handleError(e: any): any {
    this.isUp = false;
    this.exception = e;
    console.log("Error status : " + e.status);
  }
}