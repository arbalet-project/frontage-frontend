import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RandomFlashingOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-random-flashing-options',
  templateUrl: 'random-flashing-options.html',
})
export class RandomFlashingOptionsPage {
  options: string[];

  maxTime:number=20;
  minTime:number=5;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}
