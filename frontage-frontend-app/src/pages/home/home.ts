import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FAppListPage } from '../f-app-list/f-app-list';
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

  toList() {
    console.log("isUp : " + this.isUp);

    console.log(JSON.stringify(this.isUp));

    this.navCtrl.push(FAppListPage);
  }

  testGetToken() {
    console.log("testGetToken");
    this.authentication.refreshToken();
    
    this.token=this.authentication.getToken();
    console.log('Token : ' + this.authentication.getToken());
  }

  refreshTokenValue() {
    this.token=this.authentication.getToken();
  }

  handleError(e: any): any {
    this.isUp = false;
    this.exception = e;
    console.log("Error status : " + e.status);
  }
}

