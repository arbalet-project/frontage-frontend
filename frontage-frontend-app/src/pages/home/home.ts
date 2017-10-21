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

  constructor(public navCtrl: NavController, public authentication: AuthenticationProvider) {

    authentication.isUp().subscribe(response => this.isUp=response, response => false);

  }

  toList() {
    console.log("isUp : " + this.isUp);

    console.log(JSON.stringify(this.isUp));

    this.navCtrl.push(FAppListPage);
  }


}

