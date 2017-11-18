import { WebSocketProvider } from './../../providers/web-socket/web-socket';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlagsJoytickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public webSocketProvider:WebSocketProvider) {}
  
  testSocket() {
    console.log(JSON.stringify("Start"));
    let socket = this.webSocketProvider.connect("ws://192.168.1.23:8124");

    console.log(JSON.stringify("socker : " + socket));

  }

}
