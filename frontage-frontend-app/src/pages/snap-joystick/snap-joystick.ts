import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SnapJoystickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snap-joystick',
  templateUrl: 'snap-joystick.html',
})
export class SnapJoystickPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnapJoystickPage');
  }

  ionViewDidLeave(){
    this.quitPage()
  }

  quitPage() {
    // this.fAppProvider.stopApp();
    this.navCtrl.pop();
  }
}
