import { Observable, Subscription } from 'rxjs/Rx';
import { FAppOptions } from './../../models/f-app-options';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
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

  fAppName: string = "Flags";
  flag: FApp;
  parametersList: string[];
  selectedParameter: string;
  fAppPosition: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataFAppsProvider: DataFAppsProvider) {
    let fAppParams: FApp = navParams.get('selectedFapp');
    if (fAppParams) {
      this.parametersList = fAppParams.params_list.uapp;
    }
    this.fAppPosition = -1;
  }

  startFapp() {
    let options: FAppOptions = {
      name: "Flags",
      playable: "true",
      params: {
        uapp: this.selectedParameter
      }
    };

    this.dataFAppsProvider.launchFApp(options).subscribe(response => {
      //If queued then periodically check the position in the queue 
      if (response.queued) {
        let positionSubscription: Subscription = Observable.interval(response.keep_alive_delay * 250).subscribe(x => {
          this.dataFAppsProvider.checkPosition().subscribe(response => this.fAppPosition = response.position);

          //Stop when the user is no more in the queue
          if(this.fAppPosition === -1) {
            positionSubscription.unsubscribe();
          }
        });
      }
    });
  }

}
