import { NicknameGeneratorProvider } from './../../providers/nickname-generator/nickname-generator';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the SnakesJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snake-joystick',
  templateUrl: 'snake-joystick.html',
})
export class SnakeJoystickPage {

  nom:string = "";

  constructor(public nicknameGeneratorProvider: NicknameGeneratorProvider, public navParams: NavParams) {
    this.nom = nicknameGeneratorProvider.generateNicknameFr();
  }

  testSocket() {
    
    let socket:WebSocket = new WebSocket("ws://192.168.1.23:8124");

    socket.onmessage = function (message) {
      console.log(message);
      return message;
    };

    let self = this;
    socket.onopen = function () {
      console.log("connected !");
      socket.send("helloooooooo ! Coucou, tu veux voir ma " + self.nom + " ?");
    };
  }
}
