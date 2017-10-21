import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataFAppsProvider } from '../../providers/data-f-apps/data-f-apps';

/**
 * Generated class for the FAppListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-f-app-list',
  templateUrl: 'f-app-list.html',
})
export class FAppListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public fAppsData: DataFAppsProvider) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FAppListPage');
  }

  sendRequest() {
    console.log('send request');
    this.fAppsData.getList().subscribe(result => console.log(result)); 
  }

  printList(list: string) {
    console.log("list : " + list);
  }
}
