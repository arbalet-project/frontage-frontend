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
  fAppPosition: number;

  constructor(public navCtrl: NavController, public fAppsData: DataFAppsProvider) {

    fAppsData.getList()
      .subscribe(fAppList => this.fAppList = fAppList);

  }

  showOptions(fApp: FApp) {
    this.navCtrl.push(this.computePageName(fApp), { selectedFapp: fApp, test: "test" });
  }

  printList() {
    console.log("list : " + JSON.stringify(this.fAppList));
  }

  private computePageName(fApp: FApp): string {
    return fApp.name + "OptionsPage";
  }
}
