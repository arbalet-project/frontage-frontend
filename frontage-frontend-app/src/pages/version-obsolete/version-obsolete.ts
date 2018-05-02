import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VersionObsoletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-version-obsolete',
  templateUrl: 'version-obsolete.html',
})
export class VersionObsoletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.navCtrl.remove(this.navCtrl.getPrevious().index);
  }

}
