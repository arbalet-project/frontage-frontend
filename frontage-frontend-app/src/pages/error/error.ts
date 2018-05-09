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

  quitPage() {
    this.navCtrl.push(LoginPage).then(() => this.navCtrl.remove(this.navCtrl.getPrevious().index))
  }
  
  ionViewDidEnter(){
    while((this.navCtrl.getPrevious() != this.navCtrl.getByIndex(0)) && (this.navCtrl.getActive() !=  this.navCtrl.getByIndex(0))) {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    }
  }
}