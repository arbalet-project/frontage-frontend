import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { FlagsJoytickPage } from './../flags-joytick/flags-joytick';

import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackingProvider } from '../../providers/tracking/tracking';

@Component({
  selector: 'page-flags-options',
  templateUrl: 'flags-options.html',
})
export class FlagsOptionsPage {

  flag: FApp;
  parametersList: string[];
  isAdmin: boolean = false;

  joystickPage: any = FlagsJoytickPage;
  fAppOptions: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider,
    public tracker: TrackingProvider) {
    this.tracker.selectEvent("Flags");
    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

    //Get the flags list
    this.flag = navParams.get('selectedFapp');
    if (this.flag) {
      this.parametersList = this.flag.params_list.uapp;
    }

    //Init the flag options to send to the back
    this.fAppOptions = {
      name: "Flags",
      params: {
        uapp: "french"
      }
    }
  }
}
