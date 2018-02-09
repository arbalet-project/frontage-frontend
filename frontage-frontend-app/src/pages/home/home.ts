import { ErrorPage } from './../error/error';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  slideData = [{ image: "assets/img/SweepRand.jpeg" },{ image: "assets/img/SweepAsync.jpeg" },{ image: "assets/img/home_screen.jpg" }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  goToLoginPage(){
    //Change page
    this.navCtrl.push(LoginPage);
  }
}