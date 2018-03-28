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

  // sendWithSocket() {
  //   const socket = io("http://192.168.1.17:8123/socket");
  //   alert("socket id : " + socket.id)

  //   socket.on('connect', () => {alert("connect"); socket.emit("pouet")});

  //   socket.on('coucou', msg => alert("Message : " + msg));

  //   socket.on('error', (error) => alert("erreur : " + JSON.stringify(error) ))

  //   socket.on('connect_timeout', (timeout) => alert("timeout : " + JSON.stringify(timeout) ))

  //   socket.on('connect_error', (connect_error) => alert("connect_error : " + JSON.stringify(connect_error) ))
  // }
}