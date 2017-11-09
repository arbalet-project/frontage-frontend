import { Subscription, Observable } from 'rxjs/Rx';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';
import { WaitingComponent } from './../../components/waiting-component';

import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  fAppOptions: FormGroup;
  fAppPosition: number;

  constructor(public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  lauchApp() {

    let options: FAppOptions = {
      name: "RandomFlashing",
      playable: "true",
      params: {
        dur_min: 1,
        dur_max: 15,
        refresh_rate: 80,
        colors: this.fAppOptions.value.fAppColor,
        uapp: "flashes"
      }
    }

    
    this.dataFAppsProvider.launchFApp(options).subscribe(response => this.showModal(response));

    //  subscribe(response => {
    //     
    // };
  }

  showModal(response) {
    let profileModal = this.modalCtrl.create(WaitingComponent, {serverInfo: response});
    profileModal.present();
  }
}

