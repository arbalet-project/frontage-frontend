import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  errorMessage: String;
  isDisplayed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.errorMessage = this.navParams.get("errorMessage");
  }

  displayError() {
    this.isDisplayed = !this.isDisplayed;
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