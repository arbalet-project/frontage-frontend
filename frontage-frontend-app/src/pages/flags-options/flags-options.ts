import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlagsOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flags-options',
  templateUrl: 'flags-options.html',
})
export class FlagsOptionsPage {

  flag: FApp;
  parametersList: string[];
  selectedParameter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("in the app : " + navParams.get('test'));
    console.log("in the app : " + navParams.get('selectedFapp'));
    let test: FApp = navParams.get('selectedFapp');
    console.log("test : " + JSON.stringify(test));
    if (test) {
      this.parametersList = test.params_list.uapp;
    }
    // this.flag = navParams.get('selectedFapp');
    // this.parametersList = this.flag.params_list.uapp;
  }

}
