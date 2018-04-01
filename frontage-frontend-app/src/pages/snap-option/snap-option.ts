import { FAppOptions } from './../../models/f-app-options';
import { AdminProvider } from './../../providers/admin/admin';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-snap-option',
  templateUrl: 'snap-option.html',
})
export class SnapOptionPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public adminProvider: AdminProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnapOptionPage');
  }

  forceFapp() {
    let options: FAppOptions = {
      name: "Snap",
      params: {}
    };
    this.adminProvider.launchForcedFApp(options)
      .subscribe(response => response);
  }
}
