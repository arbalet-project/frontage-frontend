import { RandomFlashingOptionsPage } from './../random-flashing-options/random-flashing-options';
import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public fAppsData: DataFAppsProvider) {

    fAppsData.getList().subscribe(fAppList => {
      this.fAppList = fAppList;
    });
    
  }

  showOptions() {
    this.navCtrl.push(RandomFlashingOptionsPage);
   // this.navCtrl.push("FlagsOptionsPage");
  }

  printList(list: string) {
    console.log("list : " + list);
  }
}
