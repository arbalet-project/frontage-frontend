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
  selectedParameter: string = "french";
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
      params: {
        uapp: this.selectedParameter
      }
    };

    console.log(JSON.stringify(this.parametersList));
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.navCtrl.push(WaitingPage, {info:response, joystick:FlagsJoytickPage, joystickParams:{selectedParam:this.selectedParameter, paramsList:this.parametersList}}));
  }

}
