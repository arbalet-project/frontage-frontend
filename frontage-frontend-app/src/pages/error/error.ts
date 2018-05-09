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
  isPopping: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("entered")
    this.errorMessage = this.navParams.get("errorMessage");
    
  }

  displayError() {
    console.log("toggle display")
    this.isDisplayed = !this.isDisplayed;
  }

  quitPage() {
    console.log("Quit page")
    this.navCtrl.push(LoginPage).then(() => this.navCtrl.remove(this.navCtrl.getPrevious().index))
  }

  ionViewDidEnter() {
    if(!this.isPopping) {
      this.isPopping = true
      this.popPageBelow()
    }
  }

  popPageBelow() {
    
    if ((this.navCtrl.getPrevious().id != this.navCtrl.getByIndex(0).id) && (this.navCtrl.getActive().id != this.navCtrl.getByIndex(0).id)) {
      let self=this;
      this.navCtrl.remove(this.navCtrl.getPrevious().index).then(() => self.popPageBelow())
    }else {
      this.isPopping = false
    }
  }
}