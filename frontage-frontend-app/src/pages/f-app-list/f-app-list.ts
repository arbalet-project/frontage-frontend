import { FlagFAppPage } from './../flag-f-app/flag-f-app';
import { Observable, Subscription } from 'rxjs/Rx';
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
  fAppPosition : number;
  private inQueueSubscription: Subscription;

  constructor(private navCtrl: NavController, private navParams: NavParams
    , private fAppsData: DataFAppsProvider) {
    fAppsData.getList().subscribe(fAppList => {
      this.fAppList = fAppList;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FAppListPage');
  }

  launchApp(fappName: string) {
    this.fAppsData.launchFApp(fappName).subscribe(response => {
      //If queued then periodicly check the position in the queue
      if (response.queued) {
        console.log();
        this.inQueueSubscription = Observable.interval(response.keep_alive_delay * 500).subscribe(x => {
          this.fAppsData.checkPosition().subscribe(response => this.fAppPosition = response.position);
        });
      }
      //TODO : Launch the joystick to start playing
    });
  }

  printList(list: string) {
    console.log("list : " + list);
  }
}
