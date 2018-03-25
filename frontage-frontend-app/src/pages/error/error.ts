import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  constructor(public navCtrl: NavController) {
  }

  goToLoginPage(){
    //Change page
    this.navCtrl.popToRoot();
    this.navCtrl.push(LoginPage);
  }

  backButtonAction() {
    this.goToLoginPage();
  }
}
