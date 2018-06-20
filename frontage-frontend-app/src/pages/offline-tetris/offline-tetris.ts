import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { initialize } from 'initialization.js';
declare var initialize
declare var quitTetris

/**
 * Generated class for the OfflineTetrisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offline-tetris',
  templateUrl: 'offline-tetris.html',
})
export class OfflineTetrisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflineTetrisPage');
    initialize()
  }

  ionViewDidLeave() {
    quitTetris()
  }

}
