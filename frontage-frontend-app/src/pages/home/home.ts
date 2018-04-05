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
  
  slideData = [{ image: "assets/img/SweepRand.jpeg" },{ image: "assets/img/SweepAsync.jpeg" },{ image: "assets/img/home_screen.jpg" }];


  constructor(public navCtrl: NavController, public navParams: NavParams, public loca: Location) {
  }
  
  goToLoginPage(){
    //Change page
    this.navCtrl.push(LoginPage);
  }

  test(){
    alert("<h1>Yoh !<h1>");
  }

}