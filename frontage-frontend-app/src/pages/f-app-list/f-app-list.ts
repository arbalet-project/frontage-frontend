
import { RandomFlashingOptionsPage } from './../random-flashing-options/random-flashing-options';
import { FApp } from './../../models/fapp';
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

  fAppList: FApp[];
  
  constructor(private navCtrl: NavController, private navParams: NavParams
    , private fAppsData: DataFAppsProvider) {

    fAppsData.getList().subscribe(fAppList => {
      this.fAppList = fAppList;
    });
    
  }

  showOptions() {
    this.navCtrl.push(RandomFlashingOptionsPage);

  }

  printList(list: string) {
    console.log("list : " + list);
  }
}
