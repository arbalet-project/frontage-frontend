import { TestPage } from './../test/test';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goToLoginPage(){
    //Change page
    this.navCtrl.push(LoginPage);
  }

  testPage(){
    //Change page
    this.navCtrl.push(TestPage);
  }
}