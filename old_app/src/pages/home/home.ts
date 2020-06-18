import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LoginPage } from '../login/login';
import { Location } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slideData = [{ image: "assets/img/home/1.jpg" }, { image: "assets/img/home/2.jpg" }, { image: "assets/img/home/3.jpg" },
  { image: "assets/img/home/4.jpg" }, { image: "assets/img/home/5.jpg" }, { image: "assets/img/home/6.jpg" }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loca: Location) {
  }

  goToLoginPage() {
    //Change page
    this.navCtrl.push(LoginPage);
  }

}
