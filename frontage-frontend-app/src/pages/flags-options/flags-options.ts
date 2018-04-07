import { AdminProvider } from './../../providers/admin/admin';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { FlagsJoytickPage } from './../flags-joytick/flags-joytick';
import { WaitingPage } from './../waiting/waiting';
import { FAppOptions } from './../../models/f-app-options';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FApp } from './../../models/fapp';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-flags-options',
  templateUrl: 'flags-options.html',
})
export class FlagsOptionsPage {

  flag: FApp;
  parametersList: string[];
  isAdmin: boolean = false;

  joystickPage: any = FlagsJoytickPage;
  fAppOptions: FAppOptions;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataFAppsProvider: DataFAppsProvider,
    public localStorageProvider: LocalStorageProvider,
    public adminProvider: AdminProvider) {

    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

    let fAppParams: FApp = navParams.get('selectedFapp');
    if (fAppParams) {
      this.parametersList = fAppParams.params_list.uapp;
    }

    this.fAppOptions = {
      name: "Flags",
      params: {
        uapp: "french"
      }
    }
  }
}
