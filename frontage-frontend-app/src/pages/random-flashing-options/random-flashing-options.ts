import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';

import { Component } from '@angular/core';
import { IonicPage, } from 'ionic-angular';

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

  duration:number;
  maxTime:number=20;
  minTime:number=5;

  constructor(public dataFAppsProvider: DataFAppsProvider) {
  }

  lauchApp() {
    

    if(this.duration < this.minTime && this.duration > this.maxTime) {
      return;
    } 

    let options: FAppOptions = {
      name: "RandomFlashing",
      playable: "true",
      params_list: {
        duration: this.duration
      }
    }

    this.dataFAppsProvider.launchFApp(options);
  }
  
}
